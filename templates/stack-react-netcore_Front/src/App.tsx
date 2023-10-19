import { Suspense, createContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectRoutes } from './guards'
import { Layout } from './layout'
import { LoadingPage } from './pages/LoadingPage'
import Page404 from './pages/Page404'
import Home from './pages/Privates/Home'

import 'sweetalert2/dist/sweetalert2.min.css'
import './App.css'
import { TokenExpirado } from './pages/Publics/TokenExpirado'
import Welcome from './pages/Publics/Welcome'
import interceptorSetup from './services/interceptorSetup'
import { Login } from './components/Login/Login'
import { Redirect } from './components/Login/Redirect'
import { FormPermisos } from './pages/Privates/FormPermisos'
import { FormRolesPermisos } from './pages/Privates/FormRolespermisos'
import { FormSitios } from './pages/Privates/FormSitios'
import { FormUsuarios } from './pages/Privates/FormUsuarios'
import { FormUsuariosRoles } from './pages/Privates/FormusUariosRoles'
import { FormTiposDeObra } from './pages/Privates/FormTiposDeObra'
import { FormEdificios } from './pages/Privates/FormEdificios'
import { FormPresupuestos } from './pages/Privates/FormPresupuestos'
import { FormRoles } from './pages/Privates/FormRoles'
import { useUserStore } from './services/Stores/useUserStore'

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
                <Route path="roles" element={<FormRoles />} />
                <Route path="rolespermisos" element={<FormRolesPermisos />} />
                <Route path="sitios" element={<FormSitios />} />
                <Route path="usuarios" element={<FormUsuarios />} />
                <Route path="usuariosroles" element={<FormUsuariosRoles />} />
                <Route path="tiposdeobra" element={<FormTiposDeObra />} />
                <Route path="edificios" element={<FormEdificios />} />
                <Route path="presupuestos" element={<FormPresupuestos />} />
              </Route>
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </ThemeContext.Provider>
      </BrowserRouter>
    </Suspense>
  )
}
