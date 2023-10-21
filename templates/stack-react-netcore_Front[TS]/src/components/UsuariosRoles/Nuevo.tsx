import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { UsuarioRol, useUsuariosRoles, useUsuariosRolesStore } from '../../services'
import { Combo as ComboRol } from '../Roles'
import { Combo as ComboUsuario } from '../Usuarios'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import { IconButton, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from '../../hooks/useForm'

export const Nuevo = () => {
  const { Guardar } = useUsuariosRoles()
  const Seleccionado = useUsuariosRolesStore((state) => state.Seleccionado)
  const Selecionar = useUsuariosRolesStore((state) => state.Selecionar)

  useEffect(() => {
    Seleccionado ?? Selecionar(new UsuarioRol())
  }, [Seleccionado, Selecionar])
  
  const { state, bind } = useForm(Seleccionado || new UsuarioRol());

  function handleGuardarUsuarioRol(e: React.FormEvent<HTMLFormElement>): void {
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
          <IconButton color='success' onClick={() => Selecionar(new UsuarioRol())}>
            <AddCircleIcon />
          </IconButton>
        )}
      </Grid>
      <form onSubmit={handleGuardarUsuarioRol}>
        <Grid container justifyContent="start" alignItems="center" spacing={1}>
          <Grid item xs={4}>
            <ComboUsuario name={'usuarioId'} value={state?.usuarioId} bind={bind} />
          </Grid>
          <Grid item xs={4}>
            <ComboRol name={'rolId'} value={state?.rolId} bind={bind} />
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