// PLUGINS IMPORTS //
import { AuthProvider } from 'lib/auth'
import { ChakraProvider } from '@chakra-ui/react'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import 'styles/globals.css'

/////////////////////////////////////////////////////////////////////////////

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
