// PLUGINS IMPORTS //
import { useDisclosure, useToast } from '@chakra-ui/react'
import * as yup from 'yup'
import useSWR from 'swr'

// COMPONENTS IMPORTS //
import { DashboardTemplate } from 'components/templates'
import { FormModalAtom } from 'components/atoms'
import {
  DashboardTable,
  DashboardTableSkeleton,
  DashboardBlank
} from 'components/organisms'

// EXTRA IMPORTS //
import { useAuth } from 'lib/auth'
import { createSite } from 'lib/database'
import { fetcher } from 'utils/api.utils'

/////////////////////////////////////////////////////////////////////////////

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data } = useSWR('/api/sites', fetcher)
  const { user } = useAuth()
  const toast = useToast()

  const hasPlan = user !== undefined

  return (
    <>
      <DashboardTemplate onOpen={onOpen}>
        {data ? (
          data.sites && data.sites.length > 0 ? (
            <DashboardTable sites={data.sites} />
          ) : (
            <DashboardBlank onOpen={onOpen} />
          )
        ) : (
          <DashboardTableSkeleton />
        )}
      </DashboardTemplate>

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
    </>
  )
}

export default Dashboard
