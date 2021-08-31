import './setup'

import React from 'react'
import { render } from 'react-dom'

import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from './app'
import { getBaseRef, upsertElement } from './core/utils/browser'
import { ThemeProvider } from './extensions/mui/theme'

const baseRef = getBaseRef()

render(
  <Auth0Provider
    cacheLocation="localstorage"
    clientId="p0tbIrJWmASIMSn7vmkNsh9QOCZechZd"
    domain="dev-wpxq5mt0.au.auth0.com"
    redirectUri={`${window.location.origin}${baseRef}`}
  >
    <Router basename={baseRef}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </Auth0Provider>,
  upsertElement('spa-seed-root')
)
