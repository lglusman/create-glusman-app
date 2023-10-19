import { Checkbox } from '@mui/material'
import { useSitiosStore } from '../../services/Stores/useSitiosStore'

export const EsPaginado = () => {
  const setPagina = useSitiosStore((state) => state.SetPagina)
  const pagina = useSitiosStore((state) => state.Opciones.pag)

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
