import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import DateAdapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import App from './components/App'
import theme from './theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <CssBaseline />
      <App />
    </LocalizationProvider>
  </ThemeProvider>,
  document.querySelector('#root')
)
