// PLUGINS IMPORTS //
import { AuthProvider } from 'lib/auth'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import theme from 'styles/theme'

/////////////////////////////////////////////////////////////////////////////

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
