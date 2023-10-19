import { Pagination } from "@mui/material"
import { useUsuariosRolesStore } from "../../services/Stores/useUsuariosRolesStore"

export const Paginas = () => {
  const setPagina = useUsuariosRolesStore((state) => state.SetPagina)
  const Lista = useUsuariosRolesStore((state) => state.Lista)
  const cantidadPaginas = Math.ceil((Lista?.totalRegistros || 0) / (Lista?.tamanoPagina || 1)) 
  const paginaActual = Lista?.paginaActual || 0

  function handleChange(_: React.ChangeEvent<unknown>, page: number): void {
    setPagina(page)
  }

  return (
    <>
    {
      paginaActual > 0 && (Lista?.tamanoPagina || 0) > 0 && <Pagination count={cantidadPaginas} page={paginaActual} variant="outlined" color="primary" shape="rounded" onChange={handleChange} />
    }
    </>
  )
}