// PLUGINS IMPORTS //
import { FC } from 'react'
import { IFeedback } from 'ts/types.type'
import { Box, Heading, Text, Divider } from '@chakra-ui/react'
import { dateFormat } from 'utils/string.utils'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  feedback: IFeedback
}

const Feedback: FC<PropsType> = ({ feedback }) => {
  return (
    <Box borderRadius={4} maxW={'700px'} w={'full'}>
      <Heading
        size={'sm'}
        as="h3"
        mb={0}
        color={'gray.900'}
        fontWeight={'medium'}
      >
        {feedback.author}
      </Heading>
      <Text mb={4} color={'gray.500'} fontSize={'xs'}>
        {dateFormat(feedback.createdAt)}
      </Text>
      <Text color={'gray.800'}>{feedback.text}</Text>
      <Divider borderColor={'gray.200'} backgroundColor={'gray.200'} />
    </Box>
  )
}

export default Feedback

const authorColor = {
  light: 'gray.900',
  dark: 'gray.200',
}
const textColor = {
  light: 'gray.800',
  dark: 'gray.300',
}
const dividerColor = {
  light: 'gray.200',
  dark: 'gray.700',
}
