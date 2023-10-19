import { useMediaQuery } from '@mui/material'
import { createContext, useContext, useEffect, useState } from 'react'

type ThemeContextType = {
  darkMode: boolean
  handleDarkMode: () => void
}

const ThemeCtx = createContext<ThemeContextType>({
  darkMode: false,
  handleDarkMode: () => {},
})

interface ThemeCtxProviderProps {
  children: React.ReactNode
}
export function ThemeCtxProvider({ children }: ThemeCtxProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [darkMode, setDarkMode] = useState<boolean>(false)
  useEffect(() => {
    if (window.localStorage.getItem('theme') === 'dark') {
      setDarkMode(true)
    } else if (window.localStorage.getItem('theme') === 'light') {
      setDarkMode(false)
    } else {
      setDarkMode(prefersDarkMode)
    }
  }, [prefersDarkMode])
  const handleDarkMode = () => {
    if (darkMode) {
      window.localStorage.setItem('theme', 'light')
      setDarkMode(false)
    } else {
      window.localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    }
  }
  return <ThemeCtx.Provider value={{ darkMode, handleDarkMode }}>{children}</ThemeCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeMode() {
  return useContext(ThemeCtx)
}
