import { NextApiRequest, NextApiResponse } from 'next'
import db from 'lib/firebase-admin'
import { collections } from 'lib/constants'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const snapshot = await db.collection(collections.sites).get()

  console.log('request')
  let list = []
  snapshot.forEach(async (doc) => list.push({ id: doc.id, ...doc.data() }))

  res.status(200).json({ sites: list })
}
