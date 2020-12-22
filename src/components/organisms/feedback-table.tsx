// PLUGINS IMPORTS //
import { Box, Code } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

// COMPONENTS IMPORTS //
import { Table, Tr, Th, Td } from '../molecules/table/table.components'
import { dateFormat } from 'utils/string.utils'
import { IFeedback } from 'ts/types.type'

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  feedback: Array<IFeedback>
}

const FeedbackTable: FC<PropsType> = (props) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {props.feedback.map((el) => (
          <Box as="tr" key={el.id}>
            <Td fontWeight={'medium'}>{el.siteId}</Td>
            <Td>{el.text}</Td>
            <Td>
              <Code>{'/'}</Code>
            </Td>
            <Td>'Remove'</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}

export default FeedbackTable
