// PLUGINS IMPORTS //
import { GetStaticProps, GetStaticPaths } from 'next'
import { FC } from 'react'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { IFeedback } from 'ts/types.type'
import { getAllFeedback } from 'lib/db-admin'

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  initialFeedback: Array<IFeedback>
}

const SiteFeedback: FC<PropsType> = (props) => {
  return <div>hell world</div>
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { siteId } = ctx.params
  const feedback = await getAllFeedback(siteId as string)

  return { props: { initialFeedback: feedback } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          siteId: 'U6fxRyyZ8X7hmD3kPFiG',
        },
      },
    ],
    fallback: false,
  }
}

export default SiteFeedback
