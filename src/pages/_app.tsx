// PLUGINS IMPORTS //
import { ProvideAuth } from 'lib/auth'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import 'styles/globals.css'

/////////////////////////////////////////////////////////////////////////////

const App = ({ Component, pageProps }) => {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  )
}

export default App
