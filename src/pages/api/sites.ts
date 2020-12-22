import { NextApiRequest, NextApiResponse } from 'next'
import { getAllSites } from 'lib/db-admin'
import { auth } from 'lib/firebase-admin'
import { respond } from 'utils/api.utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await respond(async () => {
    const { token } = req.headers
    const { uid } = await auth.verifyIdToken(token as string)

    const { data } = await getAllSites(false, uid)
    return data
  })

  res.status(error ? 500 : 200).json({ sites: data, error })
}
