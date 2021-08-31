import React, { lazy, Suspense } from 'react'
import { LoadingPage } from '../loading'

const AsyncMainPage = lazy(() => import('./main-page'))

export function MainPage(): JSX.Element {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AsyncMainPage />
    </Suspense>
  )
}
