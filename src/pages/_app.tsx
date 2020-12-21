// PLUGINS IMPORTS //
import { AuthProvider } from 'lib/auth'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import 'styles/globals.css'

/////////////////////////////////////////////////////////////////////////////

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
