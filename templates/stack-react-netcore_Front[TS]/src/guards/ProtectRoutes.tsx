import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUserStore } from '../services/Stores/useUserStore'

export const ProtectRoutes = () => {
  const User = useUserStore((state) => state.User)
  const [alowed, setAlowed] = useState(false)
  const [alowedSeted, setAlowedSeted] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (User?.token) {
      const locationpath = location.pathname.replace('/', '')
      if (locationpath === 'home' || locationpath === '') {
        setAlowed(true)
      } else {
        if (User.permisos.findIndex((p) => p.url.toUpperCase() === locationpath.toUpperCase()) > -1) {
          setAlowed(true)
        } else {
          setAlowed(false)
        }
      }
    } else {
      setAlowed(false)
    }
    setAlowedSeted(true)
  }, [User, location.pathname])

  if (!alowedSeted) {
    return (
      <>
        <h1>Espere</h1>
      </>
    )
  }

  return <>{alowed ? <Outlet /> : <Navigate replace to="home" />}</>
}
