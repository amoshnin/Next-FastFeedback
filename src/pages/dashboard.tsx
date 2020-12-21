// PLUGINS IMPORTS //
import { Button, Heading, Text, Flex, useDisclosure } from '@chakra-ui/react'
import * as yup from 'yup'

// COMPONENTS IMPORTS //
import DashboardTemplate from 'components/templates/Dashboard.template'

// EXTRA IMPORTS //
import { useAuth } from 'lib/auth'
import ModalOrganism from 'components/organisms/modal.organism'

/////////////////////////////////////////////////////////////////////////////

const Dashboard = () => {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!user) {
    return <div>Loading...</div>
  }

  const hasPlan = user !== undefined
  const content = hasPlan
    ? {
        title: "You haven't added any sites",
        text: "Let's get started",
        button: 'Add your First Site',
        onClick: onOpen
      }
    : {
        title: 'Get feedback on your site',
        text: 'Start today, then grow with us 🌱',
        button: 'Upgrade to Starter',
        onClick: () => {}
      }

  return (
    <>
      <DashboardTemplate>
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
      </DashboardTemplate>

      {hasPlan && (
        <ModalOrganism
          title={'Add site'}
          content={{
            fields: [
              { title: 'Name', placeholder: 'Spacex website' },
              { title: 'Link', placeholder: 'https://website.com' }
            ],
            validation: {
              Name: yup.string().required('Required'),
              Link: yup.string().required('Required')
            }
          }}
          config={{ isOpen, onOpen, onClose }}
          buttons={{
            save: 'Create'
          }}
          returnData={(values) => {}}
        />
      )}
    </>
  )
}

export default Dashboard
