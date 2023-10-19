import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Permiso, usePermisos, usePermisosStore } from '../../services'
import { Combo as ComboSitio } from '../Sitios'

import { IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'

export const Nuevo = () => {
  const { Guardar } = usePermisos()
  const Seleccionado = usePermisosStore((state) => state.Seleccionado)
  const Selecionar = usePermisosStore((state) => state.Selecionar)

  useEffect(() => {
    Seleccionado ?? Selecionar(new Permiso())
  }, [Seleccionado, Selecionar])
  
  const { state, bind } = useForm(Seleccionado || new Permiso());

  function handleGuardarPermiso(e: React.FormEvent<HTMLFormElement>): void {
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
          <IconButton color='success' onClick={() => Selecionar(new Permiso())}>
            <AddCircleIcon />
          </IconButton>
        )}
      </Grid>
      <form onSubmit={handleGuardarPermiso}>
        <Grid container justifyContent="start" alignItems="center" spacing={1}>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.descripcionPermiso} size='small' name={'descripcionPermiso'} label='descripcionPermiso' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <ComboSitio name={'sitioId'} value={state?.sitioId} bind={bind} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.url} size='small' name={'url'} label='url' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.posicion} size='small' name={'posicion'} label='posicion' variant='outlined' />
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