// PLUGINS IMPORTS //
import { Button, Heading, Text, Code, Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'

// COMPONENTS IMPORTS //
import { useAuth } from 'lib/auth'
import { LogoIcon } from 'styles'

/////////////////////////////////////////////////////////////////////////////

const IndexPage = () => {
  const auth = useAuth()

  return (
    <Flex
      as="main"
      direction={'column'}
      align={'center'}
      justify={'center'}
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <LogoIcon boxSize={28} />

      {auth.user ? (
        <Button onClick={(e) => auth.logout()}>Logout</Button>
      ) : (
        <Button mt={4} size={'sm'} onClick={(e) => auth.loginWithGitHub()}>
          Sign in with GitHub
        </Button>
      )}
    </Flex>
  )
}

export default IndexPage
