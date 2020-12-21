// PLUGINS IMPORTS //
import { GetStaticProps, GetStaticPaths } from 'next'
import { FC } from 'react'

// COMPONENTS IMPORTS //
import { Feedback } from 'components/templates'

// EXTRA IMPORTS //
import { IFeedback } from 'ts/types.type'
import { getAllFeedback, getAllSites } from 'lib/db-admin'

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  initialFeedback: Array<IFeedback>
}

const SiteFeedbackPage: FC<PropsType> = (props) => {
  return (
    <>
      {props.initialFeedback.map((el) => (
        <Feedback key={el.id} feedback={el} />
      ))}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { siteId } = ctx.params
  const feedback = await getAllFeedback(siteId as string)

  return { props: { initialFeedback: feedback } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sites = await getAllSites()
  const paths = sites.map((site) => ({
    params: { siteId: site.id.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default SiteFeedbackPage
