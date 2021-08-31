import React from 'react'

import '@testing-library/jest-dom'

import { act, configure, fireEvent, render } from '@testing-library/react'
import { ThemeMode, ThemeModeButton, ThemeProvider } from './theme'

describe('ThemeModeButton', () => {
  configure({ testIdAttribute: 'id' })

  afterAll(() => {
    localStorage.removeItem('theme.mode')
    localStorage.removeItem('theme.type')
  })

  beforeEach(() => {
    localStorage.removeItem('theme.mode')
    localStorage.removeItem('theme.type')
  })

  test('default', () => {
    const { unmount, queryByTestId } = render(<ThemeModeButton />, { wrapper: ThemeProvider })
    const buttonElement = queryByTestId('theme-mode-button')

    const getDarkIconElement = () => queryByTestId('dark-theme-mode-icon')
    const getLightIconElement = () => queryByTestId('light-theme-mode-icon')

    expect(buttonElement).toBeInTheDocument()
    expect(getDarkIconElement()).toBeInTheDocument()
    expect(getLightIconElement()).toBeNull()

    act(() => {
      fireEvent.click(buttonElement as HTMLButtonElement)
    })

    expect(getDarkIconElement()).toBeNull()
    expect(getLightIconElement()).toBeInTheDocument()

    act(() => {
      fireEvent.click(buttonElement as HTMLButtonElement)
    })

    expect(getDarkIconElement()).toBeInTheDocument()
    expect(getLightIconElement()).toBeNull()

    unmount()
  })

  test('dark', () => {
    localStorage.setItem('theme.mode', ThemeMode.Dark)
    const { unmount, queryByTestId } = render(<ThemeModeButton />, { wrapper: ThemeProvider })
    const buttonElement = queryByTestId('theme-mode-button')

    const getDarkIconElement = () => queryByTestId('dark-theme-mode-icon')
    const getLightIconElement = () => queryByTestId('light-theme-mode-icon')

    expect(buttonElement).toBeInTheDocument()
    expect(getDarkIconElement()).toBeInTheDocument()
    expect(getLightIconElement()).toBeNull()

    act(() => {
      fireEvent.click(buttonElement as HTMLButtonElement)
    })

    expect(getDarkIconElement()).toBeNull()
    expect(getLightIconElement()).toBeInTheDocument()

    act(() => {
      fireEvent.click(buttonElement as HTMLButtonElement)
    })

    expect(getDarkIconElement()).toBeInTheDocument()
    expect(getLightIconElement()).toBeNull()

    unmount()
  })

  test('light', () => {
    localStorage.setItem('theme.mode', ThemeMode.Light)
    const { unmount, queryByTestId } = render(<ThemeModeButton />, { wrapper: ThemeProvider })
    const buttonElement = queryByTestId('theme-mode-button')

    const getDarkIconElement = () => queryByTestId('dark-theme-mode-icon')
    const getLightIconElement = () => queryByTestId('light-theme-mode-icon')

    expect(buttonElement).toBeInTheDocument()
    expect(getDarkIconElement()).toBeInTheDocument()
    expect(getLightIconElement()).toBeNull()

    act(() => {
      fireEvent.click(buttonElement as HTMLButtonElement)
    })

    expect(getDarkIconElement()).toBeNull()
    expect(getLightIconElement()).toBeInTheDocument()

    act(() => {
      fireEvent.click(buttonElement as HTMLButtonElement)
    })

    expect(getDarkIconElement()).toBeInTheDocument()
    expect(getLightIconElement()).toBeNull()

    unmount()
  })
})
