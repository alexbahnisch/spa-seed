import Button from '@mui/material/Button'
import { useAuth0 } from '@auth0/auth0-react'

import { getBaseRef } from '../utils/browser'

const baseRef = getBaseRef()

export function SignOutButton(): JSX.Element {
  const { isLoading, isAuthenticated, logout } = useAuth0()
  return (
    <Button
      color="secondary"
      variant="contained"
      disabled={isLoading || !isAuthenticated}
      onClick={() => logout({ returnTo: `${window.location.origin}${baseRef}` })}
    >
      SIGN OUT
    </Button>
  )
}
