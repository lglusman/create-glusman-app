import { Brightness4, Brightness7 } from '@mui/icons-material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LinkConPermiso } from '../components'
import { useThemeMode } from '../theme'
import { UserMenu } from './UserMenu'
import infrastructure from '../assets/infrastructure.png'

const drawerWidth = 240

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: '64px',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: `${drawerWidth + 10}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}))

export const Layout = ({ titulo = 'Título aquí' }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const { darkMode, handleDarkMode } = useThemeMode()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <img src={infrastructure} alt="logo" style={{ height: '35px', marginRight: '16px' }} />

          <Typography sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} variant="h6" component="div">
            {titulo}
          </Typography>
          <IconButton color="inherit" onClick={() => handleDarkMode()}>
            {darkMode ? <Brightness7 fontSize="medium" /> : <Brightness4 fontSize="medium" />}
          </IconButton>
          <UserMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ flexGrow: 1 }} component="div">
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <nav>
          <List dense>
            <LinkConPermiso to="permisos">Permisos</LinkConPermiso>
            <LinkConPermiso to="roles">Roles</LinkConPermiso>
            <LinkConPermiso to="rolespermisos">Roles / Permisos</LinkConPermiso>
            <LinkConPermiso to="sitios">Sitios</LinkConPermiso>
            <LinkConPermiso to="usuarios">Usuarios</LinkConPermiso>
            <LinkConPermiso to="usuariosroles">Usuarios / Roles</LinkConPermiso>
            <LinkConPermiso to="empresas">Empresas</LinkConPermiso>
          </List>
        </nav>
        <Divider />
        <nav>
          <List>
            <LinkConPermiso to="tiposdeobra">Tipos de obra</LinkConPermiso>
            <LinkConPermiso to="edificios">Edificios</LinkConPermiso>
            <LinkConPermiso to="presupuestos">Presupuestos</LinkConPermiso>
          </List>
        </nav>
      </Drawer>
      <Main open={open}>
        <Outlet />
      </Main>
    </Box>
  )
}
