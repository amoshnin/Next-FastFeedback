// PLUGINS IMPORTS //
import firebase from './firebase'

// EXTRA IMPORTS //
import { collections } from './constants'
import { IUser } from 'typescript/auth'

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
