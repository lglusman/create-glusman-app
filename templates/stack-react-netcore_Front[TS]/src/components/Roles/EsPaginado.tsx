import { Checkbox } from '@mui/material'
import { useRolesStore } from '../../services/Stores/useRolesStore'

export const EsPaginado = () => {
  const setPagina = useRolesStore((state) => state.SetPagina)
  const pagina = useRolesStore((state) => state.Opciones.pag)

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
