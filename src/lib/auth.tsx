// PLUGINS IMPORTS //
import { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase-client'
import cookie from 'js-cookie'

// EXTRA IMPORTS //
import { IUser } from 'ts/auth.type'
import { createUser } from './db-client'

/////////////////////////////////////////////////////////////////////////////

const AuthContext = createContext(undefined)
export const AuthProvider = (props) => {
  const auth = useProvideAuth()
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  )
}

/////////////////////////////////////////////////////////////////////////////

type IAuthProvider = 'github' | 'google'
export const useAuth = (): {
  loginWithProvider: (provider: IAuthProvider) => void
  logout: () => void
  user: IUser
} => {
  return useContext(AuthContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  const handleUser = async (rawUser): Promise<IUser> => {
    const cookieName = 'auth'
    if (rawUser) {
      const account = await formatUser(rawUser)
      const { token, ...userWithoutToken } = account
      createUser(account.uid, userWithoutToken)

      cookie.set(cookieName, 'cookie', { expires: 1 })
      setUser(account)
      return account
    } else {
      setUser(false)
      cookie.remove(cookieName)
      return undefined
    }
  }

  const loginWithProvider = (provider: IAuthProvider) => {
    const popup =
      provider === 'github'
        ? new firebase.auth.GithubAuthProvider()
        : provider === 'google'
        ? new firebase.auth.GoogleAuthProvider()
        : null

    return firebase
      .auth()
      .signInWithPopup(popup)
      .then((response) => handleUser(response))
  }

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      user ? handleUser(user) : handleUser(false)
    })

    return () => unsubscribe()
  }, [])

  return {
    user,
    loginWithProvider,
    logout,
  }
}

async function formatUser(user): Promise<IUser> {
  const token = await firebase.auth().currentUser.getIdToken()

  return {
    token,
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
    provider: user.providerData && user.providerData[0].providerId,
  }
}
