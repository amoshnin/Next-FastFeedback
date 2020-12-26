// PLUGINS IMPORTS //
import { Box, Code, Switch } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { FC } from 'react'
import { mutate } from 'swr'

// COMPONENTS IMPORTS //
import { Table, Tr, Th, Td } from 'components/molecules/table/table.components'
import { AlertButton } from 'components/atoms'

// EXTRA IMPORTS //
import { IFeedback } from 'ts/types.type'
import { deleteFeedback } from 'lib/db-client'
import { useAuth } from 'lib/auth'

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  feedback: Array<IFeedback>
}

const FeedbackTable: FC<PropsType> = (props) => {
  const auth = useAuth()

  const onDelete = (id: string) => {
    deleteFeedback(id)
    mutate(
      ['/api/feedback', auth.user.token],
      (data: { feedback: Array<IFeedback> }) => ({
        feedback: data.feedback.filter((item: IFeedback) => item.id !== id),
      }),
      false
    )
  }

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
        {props.feedback.map((el) => {
          return (
            <Box as="tr" key={el.id}>
              <Td fontWeight={'medium'}>{el.author}</Td>
              <Td>{el.text}</Td>
              <Td>
                <Code>{'/'}</Code>
              </Td>
              <Td>
                <Switch isChecked={el.status === 'active'} />
              </Td>
              <Td>
                <AlertButton
                  onAccept={() => onDelete(el.id)}
                  modal={{
                    title: 'Delete feedback',
                    text:
                      "Are you sure? You can't undo this action afterwards.",
                    acceptButtonText: 'Delete',
                    cancelButtonText: 'Cancel',
                  }}
                >
                  <DeleteIcon aria-label={'Delete feedback'} />
                </AlertButton>
              </Td>
            </Box>
          )
        })}
      </tbody>
    </Table>
  )
}

export default FeedbackTable
