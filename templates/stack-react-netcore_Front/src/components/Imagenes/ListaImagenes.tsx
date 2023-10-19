import { Grid, Paper } from '@mui/material'
import { AgregarImagen } from './AgregarImagen'
import { Carrusel } from './Carrusel'
import { ImagenRepresentado, TipoImagen } from '../../Types/types'

type props = {
  lista?: ImagenRepresentado[] | null
  tipos: TipoImagen[]
  puedeAgregar?: boolean
  puedeEliminar?: boolean
  puedeCambiarTipo?: boolean
  onAgregar?: (img: File, tipo: number) => void
  onEliminar?: (id: number) => void
  onCambioTipo?: (id: number, tipo: number) => void
}
export const ListaImagenes = ({
  lista = [],
  tipos,
  puedeAgregar = false,
  puedeEliminar = false,
  puedeCambiarTipo = false,
  onAgregar,
  onEliminar,
  onCambioTipo,
}: props) => {
  const tiposImagenes = [...new Set(lista?.map((img) => img.tipoImagenId))]

  const handleAgregar = (img: File, tipo: number) => {
    if (onAgregar) {
      onAgregar(img, tipo)
    }
  }

  const handleEliminar = (id: number) => {
    if (onEliminar) {
      onEliminar(id)
    }
  }

  const handleCambioTipo = (id: number, tipo: number) => {
    if (onCambioTipo) {
      onCambioTipo(id, tipo)
    }
  }

  const listaPorTipo = (tipo: number) => {
    const ret = lista?.filter((img) => img.tipoImagenId === tipo)
    return ret || []
  }
  const findtipo = (id: number) => {
    const ret = tipos?.find((tipo) => tipo.id === id)
    return ret?.descripcionTipoImagen || ''
  }

  return (
    <Paper elevation={3} sx={{ px: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {puedeAgregar && <div />}
            <h2>Imagenes</h2>
            {puedeAgregar && <AgregarImagen tipos={tipos} onAgregar={handleAgregar} />}
          </div>
        </Grid>

        {tiposImagenes.map((tipo) => (
          <Grid item xs={12} sm={2} key={tipo}>
            <Carrusel
              titulo={findtipo(tipo)}
              lista={listaPorTipo(tipo)}
              tipos={tipos}
              puedeEliminar={puedeEliminar}
              puedeCambiarTipo={puedeCambiarTipo}
              onEliminar={handleEliminar}
              onCambioTipo={handleCambioTipo}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}
