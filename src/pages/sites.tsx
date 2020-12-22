// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import SitesDashboard from 'components/templates/sites-dashboard'
import { DashboardNav } from 'components/layout'

/////////////////////////////////////////////////////////////////////////////

const DashboardPage = () => {
  return (
    <>
      <DashboardNav />
      <SitesDashboard />
    </>
  )
}

export default DashboardPage
