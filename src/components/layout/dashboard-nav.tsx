// PLUGINS IMPORTS //
import { Flex, Link, Avatar, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

// COMPONENTS IMPORTS //
import { LogoIcon } from 'styles'

// EXTRA IMPORTS //
import { useAuth } from 'lib/auth'

/////////////////////////////////////////////////////////////////////////////

interface PropsType {}

const DashboardNavbar: FC<PropsType> = (props) => {
  const auth = useAuth()

  return (
    <Flex backgroundColor="white" w="full" borderTop="5px solid #0a84ff">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        pt={4}
        pb={4}
        maxW="1250px"
        margin="0 auto"
        w="full"
        px={8}
        h="60px"
      >
        <Flex align="center">
          <NextLink href="/" passHref>
            <Link>
              <LogoIcon name="logo" fontSize={28} mr={8} />
            </Link>
          </NextLink>
          <NextLink href="/sites" passHref>
            <Link mr={4}>Sites</Link>
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link>Feedback</Link>
          </NextLink>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          {auth.user && (
            <Button mr={6} variant={'ghost'} onClick={() => auth.logout()}>
              Logout
            </Button>
          )}

          <NextLink href="/account" passHref>
            <Link>
              <Avatar size="sm" src={auth.user?.photoUrl} />
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DashboardNavbar
