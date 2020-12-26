// PLUGINS IMPORTS //
import firebase from './firebase-client'

// EXTRA IMPORTS //
import { collections } from './constants'

import { IUser } from 'ts/auth.type'
import { ISite, IFeedback } from 'ts/types.type'

/////////////////////////////////////////////////////////////////////////////

const firestore = firebase.firestore()

export const createUser = (uid: string, data: IUser) => {
  try {
    return firestore
      .collection(collections.users)
      .doc(uid)
      .set({ uid, ...data }, { merge: true })
  } catch (error) {}
}

export const createSite = async (data: ISite) => {
  const site = firestore.collection(collections.sites).doc()
  site.set(data)

  return site
}

export const createFeedback = async (data: IFeedback) => {
  return await firestore.collection(collections.feedback).add(data)
}

export const deleteFeedback = async (id: string) => {
  return await firestore.collection(collections.feedback).doc(id).delete()
}
