import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Sitio, useSitios, useSitiosStore } from '../../services'

import { IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'

export const Nuevo = () => {
  const { Guardar } = useSitios()
  const Seleccionado = useSitiosStore((state) => state.Seleccionado)
  const Selecionar = useSitiosStore((state) => state.Selecionar)

  useEffect(() => {
    Seleccionado ?? Selecionar(new Sitio())
  }, [Seleccionado, Selecionar])
  
  const { state, bind } = useForm(Seleccionado || new Sitio());

  function handleGuardarSitio(e: React.FormEvent<HTMLFormElement>): void {
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
          <IconButton color='success' onClick={() => Selecionar(new Sitio())}>
            <AddCircleIcon />
          </IconButton>
        )}
      </Grid>
      <form onSubmit={handleGuardarSitio}>
        <Grid container justifyContent="start" alignItems="center" spacing={1}>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.descripcionSitio} size="medium" name={'descripcionSitio'} label='descripcionSitio' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.url} size="medium" name={'url'} label='url' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.icono} size="medium" name={'icono'} label='icono' variant='outlined' />
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