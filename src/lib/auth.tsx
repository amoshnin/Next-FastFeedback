// PLUGINS IMPORTS //
import { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'

// EXTRA IMPORTS //
import { IUser } from 'typescript/auth'
import { createUser } from './database'

/////////////////////////////////////////////////////////////////////////////

const AuthContext = createContext(undefined)
export const AuthProvider = (props) => {
  console.log(props)
  const auth = useProvideAuth()
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  )
}

/////////////////////////////////////////////////////////////////////////////

export const useAuth = (): {
  loginWithGitHub: () => void
  logout: () => void
  user: any
} => {
  return useContext(AuthContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  const handleUser = (rawUser) => {
    if (rawUser) {
      const account = formatUser(rawUser)

      createUser(account.uid, account)
      setUser(account)
      return account
    } else {
      setUser(false)
      return false
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
    logout
  }
}

function formatUser(user): IUser {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData && user.providerData[0].providerId
  }
}
