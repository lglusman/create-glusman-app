import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { ImagenRepresentado, TipoImagen } from '../../Types/types'
import { Alerta } from '../UI'
import { useEnv } from '../../hooks'

type props = {
  imagen: ImagenRepresentado
  tipos: TipoImagen[]
  puedeEliminar: boolean
  puedeCambiarTipo: boolean
  onEliminar: (id: number) => void
  onCambioTipo: (id: number, tipo: number) => void
  mostrar: boolean
  onClose: () => void
}
export const VerImagen = ({
  imagen,
  tipos,
  puedeEliminar,
  puedeCambiarTipo,
  onEliminar,
  onCambioTipo,
  mostrar,
  onClose,
}: props) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const { BackendURL } = useEnv()

  const handleClose = (_event: unknown, reason: string) => {
    if (reason !== 'backdropClick') {
      setModalOpen(false)
      onClose()
    }
  }

  const close = () => {
    setModalOpen(false)
    onClose()
  }

  const handleDelete = () => {
    setDeleteOpen(false)
    setModalOpen(false)
    if (onEliminar) {
      onEliminar(imagen.id)
    }
  }

  useEffect(() => {
    setModalOpen(mostrar)
  }, [mostrar])

  return (
    <>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle
          height="30px"
          bgcolor="primary.main"
          sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', padding: 0 }}
        >
          <IconButton onClick={close}>
            <CloseIcon sx={{ color: 'white', fontWeight: '700', fontSize: '24px' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
          >
            {tipos.length > 0 && puedeCambiarTipo && (
              <>
                <FormControl>
                  <InputLabel id="selecttipos-label">Tipo</InputLabel>
                  <Select
                    fullWidth
                    labelId="selecttipos-label"
                    id="selecttipos"
                    defaultValue={imagen.tipoImagenId}
                    label="Tipo"
                    onChange={(e) => onCambioTipo(imagen.id, parseInt(e.target.value.toString()))}
                  >
                    {tipos.map((tipo) => (
                      <MenuItem key={tipo.id} value={tipo.id}>
                        {tipo.descripcionTipoImagen}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            <a href={BackendURL + imagen.urlImagen} target="_blank" rel="noreferrer" download>
              <img src={BackendURL + imagen.urlImagen} alt="imagen" max-width={500} max-height={500} />
            </a>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {imagen.fechaAlta} -
          {puedeEliminar && (
            <Button
              onClick={() => setDeleteOpen(true)}
              color="success"
              variant="contained"
              size="small"
              sx={{ marginLeft: '4px' }}
            >
              Eliminar
              <DeleteIcon />
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Alerta
        titulo="Eliminar Imagen"
        mensaje="¿Está seguro que desea eliminar la imagen?"
        open={deleteOpen}
        aceptar={() => handleDelete()}
        cancelar={() => setDeleteOpen(false)}
      />
    </>
  )
}
