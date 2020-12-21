// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //
import { useAuth } from 'lib/auth'

/////////////////////////////////////////////////////////////////////////////

const Index = () => {
  const auth = useAuth()

  return (
    <div>
      <main>
        <h1>Fast Feedback</h1>

        {auth.user && (
          <p>
            Current user: <code>{auth.user.email}</code>
          </p>
        )}

        {auth.user ? (
          <button onClick={(e) => auth.logout()}>Logout</button>
        ) : (
          <button onClick={(e) => auth.loginWithGitHub()}>
            Sign in with GitHub
          </button>
        )}
      </main>
    </div>
  )
}

export default Index
