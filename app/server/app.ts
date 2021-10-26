import express from 'express'
import { resolve } from 'path'
import { getCSP, NONE, SELF } from 'csp-header'
import { readFileSync } from 'fs'
import { APIGatewayEvent } from 'aws-lambda'
import { parse } from 'node-html-parser'
import { v4 as uuidV4 } from 'uuid'
import { AUTH0_DOMAIN, IS_PRODUCTION } from '../common/constants'
import memoize from 'fast-memoize'

export const app = express()

/* istanbul ignore next */
const staticPath = process.env.STATIC_PATH || resolve(__dirname, '..', 'ui')

function getBaseHref(request: express.Request): string {
  const gatewayHeaderText = request.headers['x-apigateway-event']

  if (typeof gatewayHeaderText !== 'string') {
    return '/'
  }

  const apiGatewayEvent: APIGatewayEvent = JSON.parse(decodeURIComponent(gatewayHeaderText))
  let base = apiGatewayEvent.requestContext.path.replace(apiGatewayEvent.path, '')

  if (!base.startsWith('/')) {
    base = `/${base}`
  }

  if (!base.endsWith('/')) {
    base += '/'
  }

  return base
}

function handleResponseHeaders(request: express.Request, response: express.Response, next: express.NextFunction) {
  const nonce = memoize(() => Buffer.from(uuidV4()).toString('base64'))

  /* istanbul ignore next */
  const connectSrc = IS_PRODUCTION ? [] : ['ws://localhost:7001']

  /* istanbul ignore next */
  const scriptSrc = IS_PRODUCTION ? [] : ['http://localhost:7001']

  response.append(
    'Content-Security-Policy',
    getCSP({
      directives: {
        /* istanbul ignore next */
        'connect-src': connectSrc.concat(SELF, `https://${AUTH0_DOMAIN}/oauth/token`),
        'default-src': [NONE],
        'font-src': [SELF],
        'frame-src': [SELF, `https://${AUTH0_DOMAIN}/`],
        'img-src': [SELF],
        'prefetch-src': [SELF],
        /* istanbul ignore next */
        'script-src': scriptSrc.concat(SELF),
        'style-src': (request.path.includes('.') && !request.path.includes('index.html') ? [] : [`'nonce-${nonce()}'`]).concat(SELF),
        'worker-src': [SELF],
      },
    })
  )
  response.append('Strict-Transport-Security', 'max-age=63072000; includeSubdomains; preload')
  response.append('X-Content-Type-Options', 'nosniff')
  response.append('X-Frame-Options', 'DENY')
  response.append('X-XSS-Protection', '1; mode=block')
  response.append('Referrer-Policy', 'same-origin')

  if (!request.path.includes('.') || request.path.includes('index.html')) {
    response.append('Set-Cookie', `nonce=${nonce()}; Domain=${request.hostname}; Path=/; Secure`)
  }

  next()
}

async function handleIndex(request: express.Request, response: express.Response, next: express.NextFunction) {
  if (request.path.includes('.') && !request.path.endsWith('index.html')) {
    next()
    return
  }

  const indexText = readFileSync(resolve(staticPath, 'index.html')).toString()
  const index = parse(indexText)

  index.querySelector('head').appendChild(parse(`<base id="base" href="${getBaseHref(request)}">`))

  response.send(index.toString())
}

async function handleFallthrough(request: express.Request, response: express.Response, next: express.NextFunction) {
  const routes: string[] = request.path.split('/')
  if (routes.length > 1) {
    response.redirect(`${getBaseHref(request)}${routes[routes.length - 1]}`)
  } else {
    next()
  }
}

app.use(handleResponseHeaders)
app.get('*', handleIndex)
app.use(express.static(staticPath, { etag: IS_PRODUCTION }))
app.get('*', handleFallthrough)
