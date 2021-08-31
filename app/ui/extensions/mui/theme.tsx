import React, { ReactNode, ReactNodeArray } from 'react'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import CssBaseline from '@mui/material/CssBaseline'
import darkScrollbar from '@mui/material/darkScrollbar'
import IconButton from '@mui/material/IconButton'
import MuiThemeProvider from '@mui/material/styles/ThemeProvider'
import merge from 'lodash.merge'
import { Cookie } from 'storage-manager-js'
import { createLocalStorageStateHook } from 'use-local-storage-state'

import createTheme, { Theme, ThemeOptions } from '@mui/material/styles/createTheme'

const cache = createCache({
  key: 'spa-seed',
  nonce: Cookie.get('nonce') || undefined,
})

const baseThemeOptions: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
      },
    },
  },
}

const darkBaseThemeOptions: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...darkScrollbar(),
        },
      },
    },
  },
  palette: {
    mode: 'dark',
  },
}

const lightBaseThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
  },
}

const muiDarkTheme: Theme = createTheme(merge({}, baseThemeOptions, darkBaseThemeOptions))
const muiLightTheme: Theme = createTheme(merge({}, baseThemeOptions, lightBaseThemeOptions))

export enum ThemeMode {
  Dark = 'dark',
  Light = 'light',
}

export enum ThemeType {
  MUI = 'mui',
}

const themeTypeMap: Record<ThemeType, Record<ThemeMode, Theme>> = {
  [ThemeType.MUI]: {
    [ThemeMode.Dark]: muiDarkTheme,
    [ThemeMode.Light]: muiLightTheme,
  },
}

export const useThemeMode = createLocalStorageStateHook<ThemeMode>('theme.mode', ThemeMode.Light)
export const useThemeType = createLocalStorageStateHook<ThemeType>('theme.type', ThemeType.MUI)

interface IProps {
  children: ReactNode | ReactNodeArray
}

export function ThemeProvider({ children }: IProps): JSX.Element {
  const [themeMode] = useThemeMode()
  const [themeType] = useThemeType()
  const themeModeMap = themeTypeMap[themeType]

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={themeModeMap[themeMode]}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  )
}

export function ThemeModeButton(): JSX.Element {
  const [themeMode, setThemeMode] = useThemeMode()
  return (
    <IconButton id="theme-mode-button" onClick={() => setThemeMode(themeMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark)} color="inherit">
      {themeMode === 'dark' ? <Brightness7Icon id="light-theme-mode-icon" /> : <Brightness4Icon id="dark-theme-mode-icon" />}
    </IconButton>
  )
}
