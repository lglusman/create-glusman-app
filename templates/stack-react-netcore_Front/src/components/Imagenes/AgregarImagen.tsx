import { Dialog, DialogContent, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useId, useRef, useState } from 'react'
import { TipoImagen } from '../../Types/types'

type props = {
  tipos: TipoImagen[]
  onAgregar: (file: File, tipo: number) => void
}
export const AgregarImagen = ({ tipos, onAgregar }: props) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTipo, setSelectedTipo] = useState(0)
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files[0]
    // const reader = new window.FileReader()
    // reader.onloadend = () => {
    //   onAddImage(reader.result)
    // }
    // reader.readAsDataURL(file)
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      onAgregar(event.currentTarget.files[0], selectedTipo)
    }
  }
  const labelId = useId()
  const handleClose = () => {
    setModalOpen(false)
  }

  const handleChange = (event: SelectChangeEvent<number>) => {
    if (event.target.value !== 0) {
      setSelectedTipo(event.target.value as number)
      if (hiddenFileInput.current) {
        hiddenFileInput.current.click()
      }
      setModalOpen(false)
    }
  }

  return (
    <>
      <IconButton
        size="large"
        sx={{ float: 'right' }}
        aria-label="upload picture"
        component="label"
        onClick={() => setModalOpen(true)}
      >
        <AddIcon
          sx={{ color: 'green', bgcolor: 'lightgrey', borderRadius: '50%', fontWeight: '700', fontSize: '36px' }}
        />
      </IconButton>
      <input id="upload-image" hidden accept="image/*" type="file" onChange={handleFileUpload} ref={hiddenFileInput} />
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogContent dividers>
          <InputLabel id={labelId}>Categoria</InputLabel>
          <Select labelId={labelId} label="Categoria" onChange={handleChange} defaultValue={0}>
            <MenuItem value={0} selected>
              Seleccione el tipo
            </MenuItem>
            {tipos.map((entidad) => (
              <MenuItem key={entidad.id} value={entidad.id}>
                {entidad.descripcionTipoImagen}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
      </Dialog>
    </>
  )
}
