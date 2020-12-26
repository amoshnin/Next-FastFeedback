// PLUGINS IMPORTS //
import { NextApiRequest, NextApiResponse } from 'next'

// COMPONENTS IMPORTS //
import { getUserFeedback } from 'lib/db-admin'

// EXTRA IMPORTS //
import { auth } from 'lib/firebase-admin'
import { respond } from 'utils/api.utils'

/////////////////////////////////////////////////////////////////////////////

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await respond(
    async () => {
      const { uid } = await auth.verifyIdToken(req.headers.token as string)

      const { feedback } = await getUserFeedback(uid)
      return feedback
    },
    { req, res }
  )

  res.status(error ? 500 : 200).json({ feedback: data, error })
}
