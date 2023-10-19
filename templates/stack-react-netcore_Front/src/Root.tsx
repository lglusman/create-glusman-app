import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { dark, light, useThemeMode } from './theme'
import { CssBaseline } from '@mui/material'
import { App } from './App'

export const Root = () => {
  const { darkMode } = useThemeMode()
  const theme = useMemo(() => {
    return createTheme(darkMode ? dark : light)
  }, [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}
