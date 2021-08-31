import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/app/**/*.(ts|tsx)'],
  coverageDirectory: '.coverage',
  projects: [
    {
      coveragePathIgnorePatterns: ['app/server/server.ts', 'app/test/*', 'app/ui/*'],
      displayName: 'server',
      setupFiles: ['<rootDir>/app/test/setup.ts'],
      testEnvironment: 'node',
      testMatch: ['<rootDir>/app/server/**/*.test.(ts|tsx)'],
      transform: {
        '\\.[jt]sx?$': 'babel-jest',
      },
    },
    {
      coveragePathIgnorePatterns: ['app/server/*', 'app/test/*', 'app/ui/main.tsx'],
      displayName: 'ui',
      setupFiles: ['<rootDir>/app/test/setup.ts'],
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/app/ui/**/*.test.(ts|tsx)'],
      transform: {
        '\\.[jt]sx?$': 'babel-jest',
      },
      transformIgnorePatterns: ['/node_modules/(?!(@babel|@mui)/)'],
    },
  ],
  resetMocks: true,
  slowTestThreshold: 5,
  verbose: true,
}

export default config
