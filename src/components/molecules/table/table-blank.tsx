// PLUGINS IMPORTS //
import { Button, Heading, Text, Flex } from '@chakra-ui/react'
import { FC } from 'react'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  content: {
    title: string
    text: string
    buttonText: string
    onClick: () => void
  }
}

const DashboardBlank: FC<PropsType> = (props) => {
  return (
    <Flex
      width="100%"
      backgroundColor={'white'}
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size={'md'} mb={2}>
        {props.content.title}
      </Heading>
      <Text mb={4}>{props.content.text}</Text>
      <Button
        fontWeight="normal"
        maxW={'200px'}
        onClick={props.content.onClick}
      >
        {props.content.buttonText}
      </Button>
    </Flex>
  )
}

export default DashboardBlank
