import { useEffect, FC } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { client } from 'lib/client'
import Box from '@mui/joy/Box'
import Link from '@mui/joy/Link'
import { useAuth } from 'components/AuthContext'

export const Login: FC = () => {
  const { state, dispatch } = useAuth()

  const { session } = state

  useEffect(() => {
    client.auth
      .getSession()
      .then(({ data }) => {
        dispatch({
          type: 'setSession',
          payload: data.session
        })
      })
      .catch(error => console.log(error))

    const {
      data: { subscription }
    } = client.auth.onAuthStateChange((_event, sessionArg) => {
      dispatch({
        type: 'setSession',
        payload: sessionArg
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <Auth
        supabaseClient={client}
        providers={['google']}
        appearance={{ theme: ThemeSupa }}
        onlyThirdPartyProviders
      />
    )
  } else {
    return (
      <Box flexDirection="column">
        <Link
          onClick={event => {
            event.preventDefault()

            client.auth.signOut().catch(error => console.log(error))
          }}
        >
          Log out
        </Link>
      </Box>
    )
  }
}
