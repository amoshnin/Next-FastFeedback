// PLUGINS IMPORTS //
import {
  Button,
  Heading,
  Text,
  Flex,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import * as yup from 'yup'

// COMPONENTS IMPORTS //
import { DashboardTemplate } from 'components/templates'
import { FormModalAtom } from 'components/atoms'

// EXTRA IMPORTS //
import { useAuth } from 'lib/auth'
import { createSite } from 'lib/database'

/////////////////////////////////////////////////////////////////////////////

const Dashboard = () => {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

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
      <DashboardTemplate onOpen={onOpen}>
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
        <FormModalAtom
          title={'Add site'}
          fields={[
            {
              title: 'name',
              placeholder: 'Spacex website',
              validation: yup.string().required('Required')
            },
            {
              title: 'link',
              placeholder: 'https://website.com',
              validation: yup.string().required('Required')
            }
          ]}
          config={{ isOpen, onOpen, onClose }}
          buttons={{
            save: 'Create'
          }}
          returnData={async ({ name, link }, actions) => {
            await createSite({
              name,
              link,
              authorId: user.uid,
              createdAt: new Date().toISOString()
            })
              .then(() => {
                onClose()
                toast({
                  title: 'Success!',
                  description: "We've created your site",
                  status: 'success',
                  duration: 5000,
                  isClosable: true
                })
                actions.resetForm()
              })
              .catch(() => {
                toast({
                  title: 'Error occured!',
                  description: 'Something went wrong...',
                  status: 'error',
                  duration: 5000,
                  isClosable: true
                })
              })
          }}
        />
      )}
    </>
  )
}

export default Dashboard
