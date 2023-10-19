import { Checkbox } from '@mui/material'
import { usePresupuestosStore } from '../../services/Stores/usePresupuestosStore'

export const EsPaginado = () => {
  const setPagina = usePresupuestosStore((state) => state.SetPagina)
  const pagina = usePresupuestosStore((state) => state.Opciones.pag)

  function handleChange(_: React.ChangeEvent<HTMLInputElement>, checked: boolean): void {
    if (checked) {
      setPagina(1)
    } else {
      setPagina(0)
    }
  }

  return (
    <label>
      Paginado
      <Checkbox checked={(pagina || 0) > 0} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
    </label>
  )
}
