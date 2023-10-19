import { Checkbox } from '@mui/material'
import { usePermisosStore } from '../../services/Stores/usePermisosStore'

export const EsPaginado = () => {
  const setPagina = usePermisosStore((state) => state.SetPagina)
  const pagina = usePermisosStore((state) => state.Opciones.pag)

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
