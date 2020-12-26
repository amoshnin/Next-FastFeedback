// PLUGINS IMPORTS //
import Head from 'next/head'
import { AuthProvider } from 'lib/auth'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import theme from 'styles/theme'

/////////////////////////////////////////////////////////////////////////////

const GlobalStyle = (props) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
            background-color: #edf2f7;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {props.children}
    </>
  )
}

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
