import React from 'react'

import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'

import { APP_TITLE } from '../../../common/constants'
import { ThemeModeButton, useThemeMode } from '../../extensions/mui/theme'
import { SignOutButton } from './sign-out-button'

export function Header(): JSX.Element {
  const [themeMode] = useThemeMode()
  return (
    <AppBar position="static">
      <Toolbar variant="dense" sx={{ display: 'flex' }}>
        <Typography variant="h5">{APP_TITLE}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography>{themeMode} mode</Typography>
        <ThemeModeButton />
        <SignOutButton />
      </Toolbar>
    </AppBar>
  )
}
