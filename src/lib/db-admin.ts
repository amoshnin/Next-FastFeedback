// PLUGINS IMPORTS //
import { firestore } from 'lib/firebase-admin'

// EXTRA IMPORTS //
import { collections } from 'lib/constants'
import { ISite, IFeedback } from 'ts/types.type'

/////////////////////////////////////////////////////////////////////////////

export const getAllFeedback = async (
  siteId: string
): Promise<Array<IFeedback>> => {
  const snapshot = await firestore
    .collection(collections.feedback)
    .where('siteId', '==', siteId)
    .get()

  let feedback = []
  snapshot.forEach((doc) => feedback.push({ id: doc.id, ...doc.data() }))
  return feedback
}

export const getAllSites = async (): Promise<Array<ISite>> => {
  const snapshot = await firestore.collection(collections.sites).get()
  let sites = []
  snapshot.forEach(async (doc) => sites.push({ id: doc.id, ...doc.data() }))

  return sites
}
