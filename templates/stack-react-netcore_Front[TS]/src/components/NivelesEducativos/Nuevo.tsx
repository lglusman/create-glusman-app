import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { NivelEducativo, useNivelesEducativos, useNivelesEducativosStore } from '../../services'

import { IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'

export const Nuevo = () => {
  const { Guardar } = useNivelesEducativos()
  const Seleccionado = useNivelesEducativosStore((state) => state.Seleccionado)
  const Selecionar = useNivelesEducativosStore((state) => state.Selecionar)

  useEffect(() => {
    Seleccionado ?? Selecionar(new NivelEducativo())
  }, [Seleccionado, Selecionar])
  
  const { state, bind } = useForm(Seleccionado || new NivelEducativo());

  function handleGuardarNivelEducativo(e: React.FormEvent<HTMLFormElement>): void {
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
          <IconButton color='success' onClick={() => Selecionar(new NivelEducativo())}>
            <AddCircleIcon />
          </IconButton>
        )}
      </Grid>
      <form onSubmit={handleGuardarNivelEducativo}>
        <Grid container justifyContent="start" alignItems="center" spacing={1}>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.descripcionNivelEducativo} size="medium" name={'descripcionNivelEducativo'} label='descripcionNivelEducativo' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.orden} size="medium" name={'orden'} label='orden' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.motivoBajaId} size="medium" name={'motivoBajaId'} label='motivoBajaId' variant='outlined' />
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