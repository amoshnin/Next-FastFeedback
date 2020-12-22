// PLUGINS IMPORTS //
import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'

// COMPONENTS IMPORTS //
import TableHeader from './table-header'
import TableBlank from './table-blank'
import TableSkeleton from './table.skeleton'

/////////////////////////////////////////////////////////////////////////////

interface PropsType {}

const Dashboard: FC<PropsType> & {
  Header: typeof TableHeader
  Blank: typeof TableBlank
  Skeleton: typeof TableSkeleton
} = (props) => {
  return (
    <Box backgroundColor="gray.100" pt={10} pb={10} minH="100vh">
      <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
        {props.children}
      </Flex>
    </Box>
  )
}

Dashboard.Header = TableHeader
Dashboard.Blank = TableBlank
Dashboard.Skeleton = TableSkeleton

export default Dashboard
