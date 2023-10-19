import { useSnackbar } from 'notistack'

export const useAlerts = () => {
  const { enqueueSnackbar } = useSnackbar()
  const autoHideDuration = 2500
  const alertSuccess = (mensaje: string) => {
    enqueueSnackbar(mensaje, { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, autoHideDuration })
  }
  const alertError = (mensaje: string) => {
    enqueueSnackbar(mensaje, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, autoHideDuration })
  }
  const alertWarning = (mensaje: string) => {
    enqueueSnackbar(mensaje, { variant: 'warning', anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, autoHideDuration })
  }
  const alertInfo = (mensaje: string) => {
    enqueueSnackbar(mensaje, { variant: 'info', anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, autoHideDuration })
  }
  return {
    alertSuccess,
    alertError,
    alertWarning,
    alertInfo
  }
}
