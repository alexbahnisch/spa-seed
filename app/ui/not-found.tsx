import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { APP_TITLE } from '../common/constants'
import { SignOutButton } from './core/components/sign-out-button'

export default function NotFound(): JSX.Element {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex' }}>
          <Typography variant="h5">{APP_TITLE}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <SignOutButton />
        </Toolbar>
      </AppBar>
      <Container>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>Not Found</CardContent>
        </Card>
      </Container>
    </>
  )
}
