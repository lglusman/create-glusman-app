import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Usuario, useUsuarios, useUsuariosStore } from '../../services'

import { IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'

export const Nuevo = () => {
  const { Guardar } = useUsuarios()
  const Seleccionado = useUsuariosStore((state) => state.Seleccionado)
  const Selecionar = useUsuariosStore((state) => state.Selecionar)

  useEffect(() => {
    Seleccionado ?? Selecionar(new Usuario())
  }, [Seleccionado, Selecionar])
  
  const { state, bind } = useForm(Seleccionado || new Usuario());

  function handleGuardarUsuario(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    Guardar(state)
  }

  return (
   <>
      <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography component="h1" variant="h6" mb={1}>
          {Seleccionado?.id ? 'Editar' : 'Nuevo'}
        </Typography>
        {Seleccionado && (
          <IconButton color='success' onClick={() => Selecionar(new Usuario())}>
            <AddCircleIcon />
          </IconButton>
        )}
      </Grid>
      <form onSubmit={handleGuardarUsuario}>
        <Grid container justifyContent="start" alignItems="center" spacing={1}>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.nombre} size='small' name={'nombre'} label='nombre' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.userName} size='small' name={'userName'} label='userName' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.password} size='small' name={'password'} label='password' variant='outlined' />
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}