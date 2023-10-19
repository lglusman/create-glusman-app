import { Box, Grid, ListItem, ListItemText } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUserStore } from '../../services/Stores/useUserStore'
import { bgMainLight, bgPaperDark, useThemeMode } from '../../theme'

type props = {
  to: string
  children: React.ReactNode
  style?: React.CSSProperties
  esDeAppBar?: boolean
}
export const LinkConPermiso = ({ to, children, style, esDeAppBar = false, ...props }: props) => {
  const User = useUserStore((state) => state.User)
  const { darkMode } = useThemeMode()

  const [alowed, setAlowed] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (User?.token) {
      if (to === 'home' || to === '') {
        setAlowed(true)
      } else {
        if (User.permisos.findIndex((p) => p.url.toUpperCase() === to.toUpperCase()) > -1) {
          setAlowed(true)
        } else {
          setAlowed(false)
        }
      }
    } else {
      setAlowed(false)
    }
  }, [User, to])
  const selected = location.pathname.replace('/', '').toLowerCase() === to.toLowerCase()

  let bgColor = selected ? 'background.default' : 'primary.main'
  let color = selected ? 'black' : 'white'
  let borderColor = bgMainLight

  if (darkMode) {
    bgColor = selected ? 'background.default' : 'background.paper'
    color = 'white'
    borderColor = bgPaperDark
  }

  if (esDeAppBar) {
    return (
      <>
        {alowed && (
          <Link to={to} style={{ ...style }} {...props}>
            <Grid container gap={2}>
              <Grid
                color={selected ? 'appbartextcolor2.main' : 'appbartextcolor.main'}
                style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                border={selected ? 2 : 0}
                borderBottom={selected ? 0 : 2}
                borderColor={selected ? 'appbarcolor2.main' : 'appbarcolor.main'}
                item
                bgcolor={selected ? 'appbarcolor2.main' : 'appbarcolor.main'}
                sx={{ padding: 0.8 }}
              >
                {children}
              </Grid>
            </Grid>
          </Link>
        )}
      </>
    )
  }

  return (
    <>
      {alowed && (
        <>
          {selected && (
            <>
              <Box sx={{ bgcolor: bgColor }}>
                <ListItem
                  sx={{
                    bgcolor: bgColor,
                    borderEndEndRadius: '8px',
                    padding: 0,
                    border: `10px solid ${borderColor}`,
                    maxHeight: '10px',
                  }}
                />
              </Box>
            </>
          )}
          <ListItem
            component={Link}
            to={to}
            dense
            sx={{ bgcolor: bgColor, color, borderStartStartRadius: '8px', borderEndStartRadius: '8px' }}
          >
            <ListItemText>{children}</ListItemText>
          </ListItem>
          {selected && (
            <>
              <Box sx={{ bgcolor: bgColor }}>
                <ListItem
                  sx={{
                    bgcolor: bgColor,
                    borderStartEndRadius: '8px',
                    padding: 0,
                    border: `10px solid ${borderColor}`,
                    maxHeight: '10px',
                  }}
                />
              </Box>
            </>
          )}
        </>
      )}
    </>
  )
}
