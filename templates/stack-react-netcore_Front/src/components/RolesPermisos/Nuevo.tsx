import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { RolPermiso, useRolesPermisos, useRolesPermisosStore } from '../../services'
import { Combo as ComboRol } from '../Roles'
import { Combo as ComboPermiso } from '../Permisos'

import { IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'

export const Nuevo = () => {
  const { Guardar } = useRolesPermisos()
  const Seleccionado = useRolesPermisosStore((state) => state.Seleccionado)
  const Selecionar = useRolesPermisosStore((state) => state.Selecionar)

  useEffect(() => {
    Seleccionado ?? Selecionar(new RolPermiso())
  }, [Seleccionado, Selecionar])
  
  const { state, bind } = useForm(Seleccionado || new RolPermiso());

  function handleGuardarRolPermiso(e: React.FormEvent<HTMLFormElement>): void {
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
          <IconButton color='success' onClick={() => Selecionar(new RolPermiso())}>
            <AddCircleIcon />
          </IconButton>
        )}
      </Grid>
      <form onSubmit={handleGuardarRolPermiso}>
        <Grid container justifyContent="start" alignItems="center" spacing={1}>
          <Grid item xs={4}>
            <ComboRol name={'rolId'} value={state?.rolId} bind={bind} />
          </Grid>
          <Grid item xs={4}>
            <ComboPermiso name={'permisoId'} value={state?.permisoId} bind={bind} />
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