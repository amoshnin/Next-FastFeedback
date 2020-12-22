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

export const useAuth = (): {
  loginWithGitHub: () => void
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

  const loginWithGitHub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
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
    loginWithGitHub,
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
