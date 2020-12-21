// PLUGINS IMPORTS //
import { Flex, Link, Avatar } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

// COMPONENTS IMPORTS //
import { LogoIcon } from 'styles'
import { useAuth } from 'lib/auth'

/////////////////////////////////////////////////////////////////////////////

interface PropsType {}

const DashboardNav: FC<PropsType> = (props) => {
  const { user } = useAuth()

  return (
    <Flex
      backgroundColor="white"
      mb={[8, 16]}
      w="full"
      borderTop="5px solid #0a84ff"
    >
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
              <LogoIcon name="logo" size="24px" mr={8} />
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
          <NextLink href="/account" passHref>
            <Link>
              <Avatar size="sm" src={user?.photoUrl} />
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DashboardNav
