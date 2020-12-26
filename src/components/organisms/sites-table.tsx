// PLUGINS IMPORTS //
import { Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

// COMPONENTS IMPORTS //
import { Table, Tr, Th, Td } from '../molecules/table/table.components'

// EXTRA IMPORTS //
import { dateFormat } from 'utils/string.utils'
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
              <NextLink href={`/site/${site.id}`}>
                <Link color={'blue.500'} fontWeight={'medium'}>
                  View Feedback
                </Link>
              </NextLink>
            </Td>
            <Td>{dateFormat(site.createdAt)}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}

export default DashboardTable
