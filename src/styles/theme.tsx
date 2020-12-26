// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const fonts = {
  body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
}

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 700,
}

const colors = {
  primary: '#0a84ff',
}
const theme = extendTheme({ colors, fonts, fontWeights })

export default theme
