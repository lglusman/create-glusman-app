import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React, { useState } from 'react'
import { Avatar, Grid, ListItemIcon } from '@mui/material'
import { Home, Logout } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import { useEnv } from '../hooks'
import { useUserStore } from '../services/Stores/useUserStore'

export const UserMenu = () => {
  const resetUser = useUserStore((state) => state.resetUser)
  const User = useUserStore((state) => state.User)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { LoginURL, PortalURL } = useEnv()

  const handleCerrarSesion = () => {
    resetUser()
    window.location = LoginURL
  }

  const handleVolverAlPortal = () => {
    window.location = PortalURL
  }

  if (!User?.token) {
    return (
      <Button color="inherit" onClick={handleCerrarSesion}>
        Iniciar sesión
      </Button>
    )
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
      >
        <Grid sx={{ display: { xs: 'none', sm: 'block' } }}>{User.name}</Grid>
        <Avatar sx={{ marginLeft: 2, width: 32, height: 32, color: 'black' }}>
          <PersonIcon />
        </Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleVolverAlPortal}>
          <ListItemIcon>
            <Home fontSize="medium" />
          </ListItemIcon>
          Volver al portal
        </MenuItem>
        <MenuItem onClick={handleCerrarSesion}>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </div>
  )
}
