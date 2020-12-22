// PLUGINS IMPORTS //
import { firestore } from 'lib/firebase-admin'

// EXTRA IMPORTS //
import { collections } from 'lib/constants'
import { ISite, IFeedback } from 'ts/types.type'
import { respond } from 'utils/api.utils'
import { sortByDate } from 'utils/string.utils'

/////////////////////////////////////////////////////////////////////////////

export const getAllFeedback = async (
  siteId: string
): Promise<{ data: Array<IFeedback>; error: any }> => {
  return await respond(async () => {
    const snapshot = await firestore
      .collection(collections.feedback)
      .where('siteId', '==', siteId)
      .get()

    let feedback = []

    snapshot.forEach((doc) => feedback.push({ id: doc.id, ...doc.data() }))
    return sortByDate(feedback, 'createdAt')
  })
}

export const getAllSites = async (
  isPublic: boolean,
  uid?: string
): Promise<{ data: Array<ISite> }> => {
  const ref = isPublic
    ? firestore.collection(collections.sites)
    : firestore.collection(collections.sites).where('authorId', '==', uid)

  const snapshot = await ref.get()
  let sites = []
  snapshot.forEach(async (doc) => sites.push({ id: doc.id, ...doc.data() }))

  return { data: sortByDate(sites, 'createdAt') }
}
