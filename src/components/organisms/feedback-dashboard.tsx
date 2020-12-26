// PLUGINS IMPORTS //
import useSWR from 'swr'

// COMPONENTS IMPORTS //
import Table from 'components/molecules/table'
import { FeedbackTable } from 'components/organisms'

// EXTRA IMPORTS //
import { useAuth } from 'lib/auth'
import { fetcher } from 'utils/api.utils'

/////////////////////////////////////////////////////////////////////////////

const FeedbackPage = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher)

  const blankContent = {
    title: 'title',
    text: 'text',
    buttonText: 'button text',
    onClick: () => {},
  }

  return (
    <Table>
      <Table.Header title={'My Feedback'} subtitle={'Feedback'} />
      {data ? (
        data.feedback && data.feedback.length > 0 ? (
          <FeedbackTable feedback={data.feedback} />
        ) : (
          <Table.Blank content={blankContent} />
        )
      ) : (
        <Table.Skeleton />
      )}
    </Table>
  )
}

export default FeedbackPage
