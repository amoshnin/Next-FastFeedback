import { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'

const AuthContext = createContext(undefined)
export const ProvideAuth = (props) => {
  const auth = useProvideAuth()
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  const loginWithGitHub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        setUser(response.user)
        return response.user
      })
  }

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false)
      })
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    user,
    loginWithGitHub,
    logout
  }
}
