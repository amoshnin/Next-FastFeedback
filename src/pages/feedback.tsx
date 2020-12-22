// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //
import FeedbackDashboard from 'components/templates/feedback-dashboard'
import { DashboardNav } from 'components/layout'
import { Box } from '@chakra-ui/react'

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const FeedbackPage = () => {
  return (
    <>
      <DashboardNav />
      <FeedbackDashboard />
    </>
  )
}

export default FeedbackPage
