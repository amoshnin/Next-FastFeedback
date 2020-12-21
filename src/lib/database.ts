// PLUGINS IMPORTS //
import firebase from './firebase'

// EXTRA IMPORTS //
import { collections } from './constants'
import { IUser } from 'typescript/auth'

/////////////////////////////////////////////////////////////////////////////

const firestore = firebase.firestore()

export const createUser = (uid: string, data: IUser) => {
  return firestore
    .collection(collections.users)
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}
