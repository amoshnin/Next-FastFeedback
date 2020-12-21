// PLUGINS IMPORTS //
import { Box, Skeleton } from '@chakra-ui/react'
import { Table, Tr, Th, Td } from './Dashboard-table.components'
import { ISite } from 'ts/site.type'
import { FC } from 'react'
import Link from 'next/link'

// COMPONENTS IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  sites: Array<ISite>
}

const DashboardTable: FC<PropsType> = (props) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {props.sites.map((site) => (
          <Box as="tr">
            <Td>{site.name}</Td>
            <Td>{site.link}</Td>
            <Td>
              <Link href={''}>View Feedback</Link>
            </Td>
            <Td>{site.createdAt}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}

export default DashboardTable
