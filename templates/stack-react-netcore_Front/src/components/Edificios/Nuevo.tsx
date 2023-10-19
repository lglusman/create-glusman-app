import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Edificio, useEdificios, useEdificiosStore } from '../../services'

import { IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'

export const Nuevo = () => {
  const { Guardar } = useEdificios()
  const Seleccionado = useEdificiosStore((state) => state.Seleccionado)
  const Selecionar = useEdificiosStore((state) => state.Selecionar)

  useEffect(() => {
    Seleccionado ?? Selecionar(new Edificio())
  }, [Seleccionado, Selecionar])
  
  const { state, bind } = useForm(Seleccionado || new Edificio());

  function handleGuardarEdificio(e: React.FormEvent<HTMLFormElement>): void {
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
          <IconButton color='success' onClick={() => Selecionar(new Edificio())}>
            <AddCircleIcon />
          </IconButton>
        )}
      </Grid>
      <form onSubmit={handleGuardarEdificio}>
        <Grid container justifyContent="start" alignItems="center" spacing={1}>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.nombre} size='small' name={'nombre'} label='nombre' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.localidad} size='small' name={'localidad'} label='localidad' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.domicilio} size='small' name={'domicilio'} label='domicilio' variant='outlined' />
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