import { resolve } from 'path'
import JestFetchMock from 'jest-fetch-mock'

JestFetchMock.enableMocks()

process.env.NODE_ENV = 'production'
process.env.STATIC_PATH = resolve(__dirname, 'assets')
