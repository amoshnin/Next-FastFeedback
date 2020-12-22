// PLUGINS IMPORTS //
import {
  Box,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
} from '@chakra-ui/react'
import { FC } from 'react'

// COMPONENTS IMPORTS //

/////////////////////////////////////////////////////////////////////////////

export interface ITableHeader {
  title: string
  subtitle: string
  button?: {
    text: string
    onClick: () => void
  }
}

const DashboardHeader: FC<ITableHeader> = (props) => {
  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>{props.subtitle}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>{props.title}</Heading>

        {props.button && (
          <Button
            id="add-site-modal-button"
            backgroundColor="gray.900"
            onClick={props.button.onClick}
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
          >
            {props.button.text}
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default DashboardHeader
