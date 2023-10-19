import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Presupuesto, usePresupuestos, usePresupuestosStore } from '../../services'
import { Combo as ComboEdificio } from '../Edificios'
import { Combo as ComboTipoDeObra } from '../TiposDeObras'

import { IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'

export const Nuevo = () => {
  const { Guardar } = usePresupuestos()
  const Seleccionado = usePresupuestosStore((state) => state.Seleccionado)
  const Selecionar = usePresupuestosStore((state) => state.Selecionar)

  useEffect(() => {
    Seleccionado ?? Selecionar(new Presupuesto())
  }, [Seleccionado, Selecionar])
  
  const { state, bind } = useForm(Seleccionado || new Presupuesto());

  function handleGuardarPresupuesto(e: React.FormEvent<HTMLFormElement>): void {
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
          <IconButton color='success' onClick={() => Selecionar(new Presupuesto())}>
            <AddCircleIcon />
          </IconButton>
        )}
      </Grid>
      <form onSubmit={handleGuardarPresupuesto}>
        <Grid container justifyContent="start" alignItems="center" spacing={1}>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.descripcion} size='small' name={'descripcion'} label='descripcion' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <ComboEdificio name={'edificioId'} value={state?.edificioId} bind={bind} />
          </Grid>
          <Grid item xs={4}>
            <ComboTipoDeObra name={'tipoDeObraId'} value={state?.tipoDeObraId} bind={bind} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.neto} size='small' name={'neto'} label='neto' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.incluye} size='small' name={'incluye'} label='incluye' variant='outlined' />
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