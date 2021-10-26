import React from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { LandingHeader } from './landing-header'

export function LandingPage(): JSX.Element {
  return (
    <Box>
      <LandingHeader />
      <Container sx={{ paddingTop: '30vh' }}>
        <Typography align="center" variant="h1">
          LANDING PAGE
        </Typography>
      </Container>
    </Box>
  )
}
