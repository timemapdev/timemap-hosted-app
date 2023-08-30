import { useState, useEffect, FC } from 'react'
import { Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { client } from 'lib/client'

export const Login: FC = () => {
  console.log('Login')
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    console.log('getting session')

    client.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session)
      })
      .catch(error => console.log(error))

    const {
      data: { subscription }
    } = client.auth.onAuthStateChange((_event, sessionArg) => {
      setSession(sessionArg)
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
    return <div>Logged in!</div>
  }
}
