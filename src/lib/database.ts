// PLUGINS IMPORTS //
import firebase from './firebase'

// EXTRA IMPORTS //
import { collections } from './constants'
import { IUser } from 'ts/auth.type'
import { ISite } from 'ts/site.type'

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
  return await firestore.collection(collections.sites).add(data)
}
