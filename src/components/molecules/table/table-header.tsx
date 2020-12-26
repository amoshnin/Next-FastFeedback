// PLUGINS IMPORTS //
import {
  Box,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react'
import { FC } from 'react'

// COMPONENTS IMPORTS //
import { Button } from 'components/atoms'

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
          <Button onClick={props.button.onClick}>{props.button.text}</Button>
        )}
      </Flex>
    </Box>
  )
}

export default DashboardHeader
