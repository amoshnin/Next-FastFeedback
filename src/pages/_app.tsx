// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //
import { Header } from "components/layout"

// EXTRA IMPORTS //
import "styles/globals.css"

/////////////////////////////////////////////////////////////////////////////

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default App
