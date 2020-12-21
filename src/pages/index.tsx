// PLUGINS IMPORTS //
import { Button, Heading, Text, Code } from '@chakra-ui/react'
import Head from 'next/head'

// COMPONENTS IMPORTS //
import { useAuth } from 'lib/auth'

/////////////////////////////////////////////////////////////////////////////

const Index = () => {
  const auth = useAuth()

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <main>
        <Heading>Fast Feedback</Heading>

        {auth.user && (
          <Text>
            Current user: <Code>{auth.user.email}</Code>
          </Text>
        )}

        {auth.user ? (
          <Button onClick={(e) => auth.logout()}>Logout</Button>
        ) : (
          <Button onClick={(e) => auth.loginWithGitHub()}>
            Sign in with GitHub
          </Button>
        )}
      </main>
    </div>
  )
}

export default Index
