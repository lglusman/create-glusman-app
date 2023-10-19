import { Box, Button, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { VerImagen } from './VerImagen'
import { ImagenRepresentado, TipoImagen } from '../../Types/types'
import { useEnv } from '../../hooks'

type props = {
  titulo: string
  lista: ImagenRepresentado[]
  tipos: TipoImagen[]
  puedeEliminar: boolean
  puedeCambiarTipo: boolean
  onEliminar: (id: number) => void
  onCambioTipo: (id: number, tipo: number) => void
}
export const Carrusel = ({
  titulo,
  lista,
  tipos,
  puedeEliminar,
  puedeCambiarTipo,
  onEliminar,
  onCambioTipo,
}: props) => {
  const [image, setImage] = useState<ImagenRepresentado>()
  const [mostrarImagen, setMostrarImagen] = useState(false)

  const { BackendURL } = useEnv()

  const handleImageClick = (img: ImagenRepresentado) => {
    setImage(img)
    setMostrarImagen(true)
  }

  const handleDelete = (id: number) => {
    setMostrarImagen(false)
    if (onEliminar) {
      onEliminar(id)
    }
  }

  return (
    <>
      <Box sx={{ bgcolor: 'black' }}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography
              color="white"
              variant="h6"
              component="div"
              display="flex"
              justifyContent="center"
              width="100%"
              alignItems="center"
            >
              {titulo}
            </Typography>
          </Grid>
        </Grid>
        <Carousel indicators navButtonsAlwaysVisible height={200} autoPlay={false} sx={{ bgcolor: 'black' }}>
          {lista.map((img) => (
            <Box
              key={img.id}
              justifyContent="center"
              alignItems="center"
              display="flex"
              sx={{ height: '100%', width: '100%', position: 'abolute' }}
            >
              <Button onClick={() => handleImageClick(img)}>
                <img
                  src={BackendURL + img.urlImagen}
                  alt="imagen"
                  style={{
                    maxWidth: '100%',
                    height: 100,
                    padding: 0,
                    margin: 0,
                  }}
                />
              </Button>
            </Box>
          ))}
        </Carousel>
      </Box>
      {image && (
        <VerImagen
          mostrar={mostrarImagen}
          imagen={image}
          tipos={tipos}
          puedeEliminar={puedeEliminar}
          puedeCambiarTipo={puedeCambiarTipo}
          onEliminar={handleDelete}
          onCambioTipo={onCambioTipo}
          onClose={() => setMostrarImagen(false)}
        />
      )}
    </>
  )
}
