// PLUGINS IMPORTS //
import {
  Box,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button
} from '@chakra-ui/react'
import { FC } from 'react'

// COMPONENTS IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  onOpen: () => void
}

const DashboardHeader: FC<PropsType> = (props) => {
  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Sites</Heading>

        <Button
          id="add-site-modal-button"
          backgroundColor="gray.900"
          onClick={props.onOpen}
          color="white"
          fontWeight="medium"
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
        >
          + Add Site
        </Button>
      </Flex>
    </Box>
  )
}

export default DashboardHeader
