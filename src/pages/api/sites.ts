// PLUGINS IMPORTS //
import { NextApiRequest, NextApiResponse } from 'next'

// COMPONENTS IMPORTS //
import { getAllSites } from 'lib/db-admin'

// EXTRA IMPORTS //
import { respond } from 'utils/api.utils'
import { auth } from 'lib/firebase-admin'

/////////////////////////////////////////////////////////////////////////////

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await respond(
    async () => {
      const { uid } = await auth.verifyIdToken(req.headers.token as string)

      const { sites } = await getAllSites(false, uid)
      return sites
    },
    { req, res }
  )

  res.status(error ? 500 : 200).json({ sites: data, error })
}
