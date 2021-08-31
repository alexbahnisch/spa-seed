import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'
import { Redirect, Route, Switch } from 'react-router'

import { LandingPage } from './landing'
import { MainPage } from './main'
import NotFound from './not-found'
import { LoadingPage } from './loading'

export function App(): JSX.Element {
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading) {
    return <LoadingPage />
  }

  if (!isAuthenticated) {
    return (
      <>
        <Switch>
          <Route sensitive exact path="/">
            <LandingPage />
          </Route>
          <Redirect push from="/*" to="/" />
        </Switch>
      </>
    )
  }

  return (
    <>
      <Switch>
        <Route sensitive exact path="/main">
          <MainPage />
        </Route>
        <Redirect exact from="/" to="/main" />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}
