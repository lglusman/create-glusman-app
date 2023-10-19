import { Card, Grid, Typography } from '@mui/material'
import { Incluir } from '.'
import { Autocompletar } from './Autocompletar'
import { Busqueda } from './Busqueda'
import { Cantidad } from './Cantidad'
import { Combo } from './Combo'
import { EsPaginado } from './EsPaginado'
import { Lista } from './Lista'
import { Nuevo } from './Nuevo'
import { Paginas } from './Paginas'
import { Seleccionado } from './Seleccionado'
export const Formulario = () => {



  return (
    <Card sx={{ p: 2 }} elevation={2}>
      <Typography component="h1" variant="h4">
        Sitios
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ p: 2, m: 2 }} elevation={2}>
            <Incluir />
          </Card>
          <Card sx={{ p: 2, m: 2 }} elevation={2}>
            <Typography component="h1" variant="h6" mb={1}>
              Busqueda
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Busqueda />
              </Grid>
              <Grid item xs={2}>
                <Cantidad />
              </Grid>
              <Grid item xs={2}>
                <EsPaginado />
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ p: 2, m: 2 }} elevation={2}>
            <Typography component="h1" variant="h6" mb={1}>
              Lista
            </Typography>
            <Paginas />
            <Lista />
            <Paginas />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ p: 2, m: 2 }} elevation={2}>
            <Nuevo />
          </Card>
          <Card sx={{ p: 2, m: 2 }} elevation={2}>
            <Typography component="h1" variant="h6" mb={1}>
              Combo
            </Typography>
            <Combo />
          </Card>
          <Card sx={{ p: 2, m: 2 }} elevation={2}>
            <Typography component="h1" variant="h6" mb={1}>
              Autocompletar
            </Typography>
            <Autocompletar titulo="Sitios" />
          </Card>
          <Card sx={{ p: 2, m: 2 }} elevation={2}>
            <Typography component="h1" variant="h6" mb={1}>
              Seleccionado
            </Typography>
            <Seleccionado />
          </Card>
        </Grid>
      </Grid>
    </Card>
  )
}
