import { logger, formatObjectKeys } from 'utils/logger'
import { NextApiRequest, NextApiResponse } from 'next'

export const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  })
  return res.json()
}

export const respond = async (
  request: () => any,
  logs?: { req: NextApiRequest; res: NextApiResponse }
) => {
  try {
    const data = await request()
    return { data, error: null }
  } catch (error) {
    if (logs) {
      logger.error(
        {
          request: {
            headers: formatObjectKeys(logs.req.headers),
            url: logs.req.url,
            method: logs.req.method,
          },
          response: {
            statusCode: logs.res.statusCode,
          },
        },
        error.message
      )
    }

    return { error, data: null }
  }
}
