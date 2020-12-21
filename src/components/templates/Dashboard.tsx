// PLUGINS IMPORTS //
import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'

// COMPONENTS IMPORTS //
import { DashboardHeader, DashboardNav } from 'components/organisms'

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  onOpen: () => void
}

const Dashboard: FC<PropsType> = (props) => {
  return (
    <Box backgroundColor="gray.100" h="100vh">
      <DashboardNav />
      <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
        <DashboardHeader onOpen={props.onOpen} />
        {props.children}
      </Flex>
    </Box>
  )
}

export default Dashboard
