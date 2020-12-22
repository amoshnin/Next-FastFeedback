import { NextApiRequest, NextApiResponse } from 'next'
import { getAllSites } from 'lib/db-admin'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await getAllSites()
  res.status(200).json({ sites: data, error })
}
