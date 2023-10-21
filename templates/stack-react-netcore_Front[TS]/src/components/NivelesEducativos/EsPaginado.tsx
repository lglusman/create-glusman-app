import { Checkbox } from '@mui/material'
import { useNivelesEducativosStore } from '../../services/Stores/useNivelesEducativosStore'

export const EsPaginado = () => {
  const setPagina = useNivelesEducativosStore((state) => state.SetPagina)
  const pagina = useNivelesEducativosStore((state) => state.Opciones.pag)

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
