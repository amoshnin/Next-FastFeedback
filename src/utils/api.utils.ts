export const fetcher = async (...args) => {
  // @ts-ignore
  const res = await fetch(...args)
  return res.json()
}
