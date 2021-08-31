import React from 'react'

import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import { Header } from '../core/components/header'

export function LoadingPage(): JSX.Element {
  return (
    <Box>
      <Header />
      <Dialog open>Loading</Dialog>
    </Box>
  )
}
