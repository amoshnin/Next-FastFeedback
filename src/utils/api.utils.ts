export const fetcher = async (...args) => {
  // @ts-ignore
  const res = await fetch(...args)
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
