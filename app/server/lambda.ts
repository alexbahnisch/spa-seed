import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { createServer, proxy } from 'aws-serverless-express'

import { app } from './app'
import { Server } from 'http'

const server = createServer(app)

export function handler(event: APIGatewayProxyEvent, context: Context): Server {
  return proxy(server, event, context)
}
