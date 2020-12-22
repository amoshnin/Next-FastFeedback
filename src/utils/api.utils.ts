export const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  })
  return res.json()
}

export const respond = async (request: () => any) => {
  try {
    const data = await request()
    return { data, error: null }
  } catch (error) {
    return { error, data: null }
  }
}
