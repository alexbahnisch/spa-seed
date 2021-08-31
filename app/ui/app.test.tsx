import React from 'react'

import { render } from '@testing-library/react'

import { App } from './app'

describe('App', () => {
  test('renders', () => {
    const { unmount } = render(<App />)
    unmount()
  })
})
