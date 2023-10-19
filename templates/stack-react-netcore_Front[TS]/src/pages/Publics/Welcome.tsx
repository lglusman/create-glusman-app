import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useEnv } from '../../hooks'
import { Permiso, Usuario } from '../../services'
import { useUserStore } from '../../services/Stores/useUserStore'
// import { UsuarioTraerLogueado } from '../../services/apis/usuarios'
import interceptorSetup from '../../services/interceptorSetup'

export default function Welcome() {
  const createUser = useUserStore((state) => state.createUser)
  const resetUser = useUserStore((state) => state.resetUser)
  const { IdSitio } = useEnv()
  const [logueado, setlogueado] = useState(false)

  useEffect(() => {
    async function loguear() {
      const queryParameters = new URLSearchParams(window.location.search)
      const tkn = queryParameters.get('tkn')
      const expire = queryParameters.get('exp') ? parseInt(queryParameters.get('exp')!) : 0
      if (tkn) {
        window.localStorage.setItem('usr', JSON.stringify({ token: tkn, permisos: [], expire }))
        interceptorSetup(tkn, expire)
        const Userlog = await Usuario.TraerLogueado()
        if (Userlog) {
          const permisos: Permiso[] = []
          if (Userlog.data.length > 0) {
            const User = Userlog.data[0]
            for (const ur of User.usuarioRoles) {
              for (const rp of ur.rol.rolPermisos) {
                if (rp.permiso.sitioId === parseInt(IdSitio)) {
                  if (!permisos.find((p) => p.id === rp.permiso.id)) {
                    permisos.push(rp.permiso)
                  }
                }
              }
            }
            createUser({ name: User.nombre, token: tkn, permisos, expire })
            setlogueado(true)
          }
        } else {
          resetUser()
        }
      } else {
        const Userlog = await Usuario.TraerLogueado()
        if (Userlog?.data?.length) {
          setlogueado(true)
        }
      }
    }
    loguear()
  }, [createUser, resetUser, IdSitio])

  return <>{logueado ? <Navigate to="/home" replace /> : <Typography variant="h2">No logueado</Typography>}</>
}
