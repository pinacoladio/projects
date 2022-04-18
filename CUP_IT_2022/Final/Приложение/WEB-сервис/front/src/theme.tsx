import red from '@material-ui/core/colors/red'
import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F2E68',
    },
    secondary: {
      main: '#D6392E',
      light: '#8896AE',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
