// PLUGINS IMPORTS //
import Head from 'next/head'

// COMPONENTS IMPORTS //
import { useAuth } from 'lib/auth'

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const Index = () => {
  const auth = useAuth()

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Fast Feedback</h1>

        {auth.user && <div>Current user: {auth.user.email}</div>}

        {auth.user ? (
          <button onClick={(e) => auth.logout()}>Logout</button>
        ) : (
          <button onClick={(e) => auth.loginWithGitHub()}>
            Sign in with GitHub
          </button>
        )}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" />
        </a>
      </footer>
    </div>
  )
}

export default Index
