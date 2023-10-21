import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Rol, useRoles, useRolesStore } from '../../services'

import { IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'

export const Nuevo = () => {
  const { Guardar } = useRoles()
  const Seleccionado = useRolesStore((state) => state.Seleccionado)
  const Selecionar = useRolesStore((state) => state.Selecionar)

  useEffect(() => {
    Seleccionado ?? Selecionar(new Rol())
  }, [Seleccionado, Selecionar])
  
  const { state, bind } = useForm(Seleccionado || new Rol());

  function handleGuardarRol(e: React.FormEvent<HTMLFormElement>): void {
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
          <IconButton color='success' onClick={() => Selecionar(new Rol())}>
            <AddCircleIcon />
          </IconButton>
        )}
      </Grid>
      <form onSubmit={handleGuardarRol}>
        <Grid container justifyContent="start" alignItems="center" spacing={1}>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.descripcionRol} size="medium" name={'descripcionRol'} label='descripcionRol' variant='outlined' />
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