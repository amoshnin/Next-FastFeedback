// PLUGINS IMPORTS //
import { Button, Heading, Text, Flex } from '@chakra-ui/react'
import { FC } from 'react'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { useAuth } from 'lib/auth'

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  onOpen: () => void
}

const DashboardBlank: FC<PropsType> = (props) => {
  const { user } = useAuth()

  const hasPlan = user !== undefined
  const content = hasPlan
    ? {
        title: "You haven't added any sites",
        text: "Let's get started",
        button: 'Add your First Site',
        onClick: props.onOpen
      }
    : {
        title: 'Get feedback on your site',
        text: 'Start today, then grow with us 🌱',
        button: 'Upgrade to Starter',
        onClick: () => {}
      }

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
        {content.title}
      </Heading>
      <Text mb={4}>{content.text}</Text>
      <Button fontWeight="normal" maxW={'200px'} onClick={content.onClick}>
        {content.button}
      </Button>
    </Flex>
  )
}

export default DashboardBlank
