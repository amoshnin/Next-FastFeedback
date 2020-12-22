// PLUGINS IMPORTS //
import { Button, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

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
        <script
          dangerouslySetInnerHTML={{
            __html: ` if (document.cookie && document.cookie.includes('auth')) {
            window.location.href = "/dashboard"
          }`,
          }}
        />
      </Head>

      <LogoIcon boxSize={28} />

      {auth.user ? (
        <Link href={'/dashboard'}>
          <Button
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            mt={4}
            maxW="200px"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
          >
            View Dashboard
          </Button>
        </Link>
      ) : (
        <Button mt={4} size={'sm'} onClick={(e) => auth.loginWithGitHub()}>
          Sign in with GitHub
        </Button>
      )}
    </Flex>
  )
}

export default IndexPage
