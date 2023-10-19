import { Checkbox } from '@mui/material'
import { useUsuariosRolesStore } from '../../services/Stores/useUsuariosRolesStore'

export const EsPaginado = () => {
  const setPagina = useUsuariosRolesStore((state) => state.SetPagina)
  const pagina = useUsuariosRolesStore((state) => state.Opciones.pag)

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
