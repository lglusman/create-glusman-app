import { Suspense, createContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectRoutes } from './guards'
import { Layout } from './layout'
import { LoadingPage } from './pages/LoadingPage'
import Page404 from './pages/Page404'
import Home from './pages/Privates/Home'

import 'sweetalert2/dist/sweetalert2.min.css'
import './App.css'
import { Login } from './components/Login/Login'
import { Redirect } from './components/Login/Redirect'
import { FormPermisos } from './pages/Privates/FormPermisos'
import { FormRoles } from './pages/Privates/FormRoles'
import { FormRolesPermisos } from './pages/Privates/FormRolesPermisos'
import { FormSitios } from './pages/Privates/FormSitios'
import { FormUsuarios } from './pages/Privates/FormUsuarios'
import { FormUsuariosRoles } from './pages/Privates/FormUsuariosRoles'
import { TokenExpirado } from './pages/Publics/TokenExpirado'
import Welcome from './pages/Publics/Welcome'
import { useUserStore } from './services/Stores/useUserStore'
import interceptorSetup from './services/interceptorSetup'

const ThemeContext = createContext<string>('')

export const App = () => {
  const User = useUserStore((state) => state.User)
  if (User?.token) {
    if (User.expire > Date.now()) {
      interceptorSetup(User.token, User.expire)
    } else {
      console.error('token vencido')
      if (window.location.pathname !== '/tokenexpirado' && window.location.pathname !== '/login') {
        window.open('/tokenexpirado', '_self')
      }
    }
    console.error('sin token')
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <ThemeContext.Provider value="dark">
          <Routes>
            <Route element={<Layout titulo="El Título aquí" />}>
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="login" element={<Login />} />
              <Route path="redirect" element={<Redirect />} />
              <Route path="welcome" element={<Welcome />} />
              <Route path="tokenexpirado" element={<TokenExpirado />} />
              <Route element={<ProtectRoutes />}>
                <Route path="home" element={<Home />} />
                <Route path="permisos" element={<FormPermisos />} />
                <Route path="rolespermisos" element={<FormRolesPermisos />} />
                <Route path="sitios" element={<FormSitios />} />
                <Route path="usuarios" element={<FormUsuarios />} />
                <Route path="roles" element={<FormRoles />} />
                <Route path="usuariosroles" element={<FormUsuariosRoles />} />
              </Route>
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </ThemeContext.Provider>
      </BrowserRouter>
    </Suspense>
  )
}
