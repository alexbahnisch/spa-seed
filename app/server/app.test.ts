import supertest from 'supertest'

import { app } from './app'

describe('app', () => {
  const request = supertest(app)

  test('/', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })

  test('/index.html', async () => {
    const response = await request.get('/index.html')
    expect(response.status).toBe(200)
  })

  test('/bundle.js', async () => {
    const response = await request.get('/bundle.js')
    expect(response.status).toBe(200)
  })

  test('/notfound', async () => {
    const response = await request.get('/notfound')
    expect(response.status).toBe(200)
  })

  test('/notfound/index.html', async () => {
    const response = await request.get('/notfound/index.html')
    expect(response.status).toBe(200)
  })

  test('/notfound/bundle.js', async () => {
    const response = await request.get('/notfound.js')
    expect(response.status).toBe(404)
  })

  test('headers[x-apigateway-event]', async () => {
    let response = await request.get('/').set(
      'x-apigateway-event',
      JSON.stringify({
        path: 'https://ieur3uhg4.execute-api.ap-southeast-2.amazonaws.com/',
        requestContext: { path: 'https://ieur3uhg4.execute-api.ap-southeast-2.amazonaws.com/prod' },
      })
    )
    expect(response.status).toBe(200)

    response = await request.get('/').set(
      'x-apigateway-event',
      JSON.stringify({
        path: 'https://ieur3uhg4.execute-api.ap-southeast-2.amazonaws.com',
        requestContext: { path: 'https://ieur3uhg4.execute-api.ap-southeast-2.amazonaws.com/prod/' },
      })
    )
    expect(response.status).toBe(200)
  })
})
