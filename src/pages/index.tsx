// PLUGINS IMPORTS //
import Head from 'next/head'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from 'styles/Home.module.css'
import { useAuth } from 'lib/auth'
import { userInfo } from 'os'

/////////////////////////////////////////////////////////////////////////////

const Index = (props) => {
  const auth = useAuth()

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        {auth.user ? (
          <button onClick={(e) => auth.logout()}>Logout</button>
        ) : (
          <button onClick={(e) => auth.loginWithGitHub()}>
            Sign in with GitHub
          </button>
        )}
        <div>{JSON.stringify(auth.user)}</div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default Index
