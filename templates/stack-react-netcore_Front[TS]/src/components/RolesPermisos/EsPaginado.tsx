import { Checkbox } from '@mui/material'
import { useRolesPermisosStore } from '../../services/Stores/useRolesPermisosStore'

export const EsPaginado = () => {
  const setPagina = useRolesPermisosStore((state) => state.SetPagina)
  const pagina = useRolesPermisosStore((state) => state.Opciones.pag)

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
