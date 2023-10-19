import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, Grid, IconButton, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Permiso } from '../../services/Entidades/Permiso'
import { Usuario } from '../../services/Entidades/Usuario'
import { useUserStore } from '../../services/Stores/useUserStore'
import { LoginImg } from './LoginImg'

export function Login() {
  const createUser = useUserStore((state) => state.createUser)
  const resetUser = useUserStore((state) => state.resetUser)

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true)
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      const username: string = data.get('username')?.toString() || ''
      const password: string = data.get('password')?.toString() || ''

      if (username?.toString().trim() === '' || password?.toString().trim() === '') {
        setError('Ingrese usuario y contraseña')
      } else {
        setError('')
        const consultapagina = await Usuario.Loguear({ username, password })
        const consulta = consultapagina.data[0]
        const permisos: Permiso[] = []
        if (consulta?.usuario) {
          for (const usuariorol of consulta.usuario.usuarioRoles) {
            for (const rolPermiso of usuariorol.rol.rolPermisos) {
              if (!permisos.find((p) => p.id === rolPermiso.permiso.id)) {
                permisos.push(rolPermiso.permiso)
              }
            }
          }
        }
        if (consulta?.token) {
          const expire = Date.now() + 1000 * 60 * 60 * 12
          createUser({ name: consulta?.usuario?.nombre, token: consulta?.token, permisos, expire })
          navigate('/redirect', { replace: true })
        }
      }
      setLoading(false)
    } catch (e: unknown) {
      if (typeof e === 'string') {
        setError(e)
      } else if (e instanceof Error) {
        setError(e.message)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    resetUser()
  }, [resetUser])

  return (
    <Grid container justifyContent="center" alignItems="center" height="100%">
      <Grid container width="90%" borderRadius={16} paddingTop={5} justifyContent="center" bgcolor="appbarcolor.main">
        <Typography component="h1" variant="h2">
          Ingreso al sistema
        </Typography>
        <Grid container justifyContent="center" gap={5} alignItems="center">
          <Grid item xs={4}>
            <LoginImg />
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h4">
                Log In
              </Typography>
              <form onSubmit={handleSubmit}>
                {!loading && (
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      style={{ backgroundColor: 'white', borderRadius: '5px' }}
                      margin="normal"
                      fullWidth
                      id="username"
                      label="Nombre de usuario"
                      name="username"
                      autoComplete="off"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      style={{ backgroundColor: 'white', borderRadius: '5px' }}
                      name="password"
                      label="Contraseña"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="off"
                      id="password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Alert severity="error" sx={{ mt: 2, display: error ? '' : 'none' }}>
                      {error}
                    </Alert>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Ingresar
                    </Button>
                  </Box>
                )}
                {loading && (
                  <Box sx={{ mt: 1 }}>
                    <Alert severity="info">Cargando, espere por favor...</Alert>
                  </Box>
                )}
              </form>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
