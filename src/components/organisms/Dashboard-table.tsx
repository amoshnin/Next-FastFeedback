// PLUGINS IMPORTS //
import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'

// COMPONENTS IMPORTS //
import { Table, Tr, Th, Td } from './Dashboard-table.components'
import { ISite } from 'ts/types.type'

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
          <Box as="tr" key={`${site.id}${site.link}`}>
            <Td fontWeight={'medium'}>{site.name}</Td>
            <Td>{site.link}</Td>
            <Td>
              <Link href={''}>View Feedback</Link>
            </Td>
            <Td>{dayjs(site.createdAt).format('MMM MM, YYYY HH:mm')}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}

export default DashboardTable
