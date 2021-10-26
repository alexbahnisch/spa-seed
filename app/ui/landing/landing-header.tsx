import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { ThemeModeButton, useThemeMode } from '../extensions/mui/theme'
import { APP_TITLE } from '../../common/constants'
import { SignInButton } from '../core/components/sign-in-button'

export function LandingHeader(): JSX.Element {
  const [themeMode] = useThemeMode()
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Typography alignSelf="centre" variant="h5">
          {APP_TITLE.toUpperCase()}
        </Typography>
        <Box sx={{ flexGrow: 0.75 }} />
        <Typography>{themeMode} mode</Typography>
        <ThemeModeButton />
        <SignInButton />
      </Toolbar>
    </AppBar>
  )
}
