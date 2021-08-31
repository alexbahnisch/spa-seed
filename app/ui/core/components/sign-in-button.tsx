import Button from '@mui/material/Button'
import { useAuth0 } from '@auth0/auth0-react'

export function SignInButton(): JSX.Element {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()
  return (
    <Button color="secondary" variant="contained" disabled={isLoading || isAuthenticated} onClick={() => loginWithRedirect()}>
      SIGN IN|SIGN UP
    </Button>
  )
}
