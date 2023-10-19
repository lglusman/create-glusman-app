import { Button, Grid, Paper, Typography } from '@mui/material'
import { useEnv } from '../../hooks'
import { useUserStore } from '../../services/Stores/useUserStore'
export const TokenExpirado = () => {
  const resetUser = useUserStore((state) => state.resetUser)

  const { LoginURL } = useEnv()
  const handleCerrarSesion = () => {
    resetUser()
    window.location = LoginURL
    //window.open(LoginURL)
  }

  return (
    <Grid container flexDirection="column" mt={10} justifyContent="center" alignItems="center">
      <Paper
        elevation={2}
        sx={{
          p: 2,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h4" component="div">
          Tu sesión ha expirado
        </Typography>
        <Typography variant="h6" component="div">
          Vuelve a ingresar al sistema
        </Typography>
        <Button onClick={handleCerrarSesion} variant="contained" color="primary" href={LoginURL}>
          Ingresar
        </Button>
      </Paper>
    </Grid>
  )
}
