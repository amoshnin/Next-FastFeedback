// PLUGINS IMPORTS //
import { useDisclosure, useToast } from '@chakra-ui/react'
import * as yup from 'yup'
import useSWR from 'swr'

// COMPONENTS IMPORTS //
import { FormModalAtom } from 'components/atoms'
import Table from 'components/molecules/table'
import { DashboardTable } from 'components/organisms'

// EXTRA IMPORTS //
import { useAuth } from 'lib/auth'
import { createSite } from 'lib/db-client'
import { fetcher } from 'utils/api.utils'

/////////////////////////////////////////////////////////////////////////////

const SitesDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useAuth()

  const { data, mutate } = useSWR(
    user ? ['/api/sites', user.token] : null,
    fetcher
  )
  const toast = useToast()

  const hasPlan = true
  const blankContent = hasPlan
    ? {
        title: "You haven't added any sites",
        text: "Let's get started",
        buttonText: 'Add your First Site',
        onClick: onOpen,
      }
    : {
        title: 'Get feedback on your site',
        text: 'Start today, then grow with us 🌱',
        buttonText: 'Upgrade to Starter',
        onClick: () => {},
      }

  return (
    <>
      <Table>
        <Table.Header
          title={'My Sites'}
          subtitle={'Sites'}
          button={{
            onClick: () => {},
            text: '+ Add Site',
          }}
        />

        {data ? (
          data.sites && data.sites.length > 0 ? (
            <DashboardTable sites={data.sites} />
          ) : (
            <Table.Blank content={blankContent} />
          )
        ) : (
          <Table.Skeleton />
        )}
      </Table>

      <FormModalAtom
        title={'Add site'}
        fields={[
          {
            title: 'name',
            placeholder: 'Spacex website',
            validation: yup.string().required('Required'),
          },
          {
            title: 'link',
            placeholder: 'https://website.com',
            validation: yup.string().required('Required'),
          },
        ]}
        config={{ isOpen, onOpen, onClose }}
        buttons={{
          save: 'Create',
        }}
        returnData={async ({ name, link }, actions) => {
          const newSite = {
            name,
            link,
            authorId: user.uid,
            createdAt: new Date().toISOString(),
          }

          await createSite(newSite)
            .then(() => {
              onClose()
              mutate({ sites: [newSite, ...data.sites] }, false)
              toast({
                title: 'Success!',
                description: "We've created your site",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
              actions.resetForm()
            })
            .catch(() => {
              toast({
                title: 'Error occured!',
                description: 'Something went wrong...',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
            })
        }}
      />
    </>
  )
}

export default SitesDashboard
