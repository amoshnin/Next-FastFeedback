// PLUGINS IMPORTS //
import { Stack, Text, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

// COMPONENTS IMPORTS //
import { Button } from 'components/atoms'

// EXTRA IMPORTS //
import { LogoIcon, GithubIcon, GoogleIcon } from 'styles'
import { useAuth } from 'lib/auth'

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
            window.location.href = "/sites"
          }`,
          }}
        />
      </Head>

      <Text mb={10} fontWeight={'bold'} fontSize={'xl'}>
        Fast Feedback
      </Text>

      <LogoIcon boxSize={28} />

      {auth.user ? (
        <Link href={'/sites'}>
          <Button mt={4}>View Dashboard</Button>
        </Link>
      ) : (
        <Stack>
          <Button
            as="a"
            mt={4}
            mb={2}
            leftIcon={<GithubIcon />}
            onClick={() => auth.loginWithProvider('github')}
          >
            Sign In with GitHub
          </Button>
          <Button
            as="a"
            leftIcon={<GoogleIcon />}
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
            onClick={() => auth.loginWithProvider('google')}
          >
            Sign In with Google
          </Button>
        </Stack>
      )}
    </Flex>
  )
}

export default IndexPage
