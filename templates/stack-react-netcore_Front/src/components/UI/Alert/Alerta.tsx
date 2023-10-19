import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'

type props = {
  open: boolean
  titulo: string
  mensaje: string
  aceptar?: () => void
  cancelar?: () => void
}
export default function Alerta({ open, titulo, mensaje, aceptar, cancelar }: props) {
  const [openDialog, setOpen] = useState(open)

  useEffect(() => {
    setOpen(open)
  }, [open])

  const handleAceptar = () => {
    setOpen(false)
    if (aceptar) {
      aceptar()
    }
  }

  const handleRechazar = () => {
    setOpen(false)
    if (cancelar) {
      cancelar()
    }
  }

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{mensaje}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAceptar}>Aceptar</Button>
          <Button onClick={handleRechazar} autoFocus>
            Rechazar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
