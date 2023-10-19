import { Checkbox } from '@mui/material'
import { useEdificiosStore } from '../../services/Stores/useEdificiosStore'

export const EsPaginado = () => {
  const setPagina = useEdificiosStore((state) => state.SetPagina)
  const pagina = useEdificiosStore((state) => state.Opciones.pag)

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
