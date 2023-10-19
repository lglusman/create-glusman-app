import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useUsuariosRoles } from '../../services'
import { useUsuariosRolesStore } from '../../services/Stores/useUsuariosRolesStore'

export const Busqueda = () => {
  const { Buscar } = useUsuariosRoles()
  const setData = useUsuariosRolesStore((state) => state.SetData)
  const SetPagina = useUsuariosRolesStore((state) => state.SetPagina)
  const Opciones = useUsuariosRolesStore((state) => state.Opciones)
  const SetBusqueda = useUsuariosRolesStore((state) => state.SetBusqueda)
  const Busqueda = useUsuariosRolesStore((state) => state.Busqueda)

  const handleBuscarUsuarioRol = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const busqueda: string = data.get('busqueda')?.toString() || ''
    if (busqueda.length > 0) {
      if (Opciones.pag !== 0) {
        SetPagina(1)
      }
      SetBusqueda(busqueda)
    }
  }

  const { data, isFetching } = Buscar(Busqueda)

  useEffect(() => {
    if (data) setData(data)
  }, [data, setData])

  if (isFetching) return <div>Cargando...</div>

  return (
    <>
      <form onSubmit={handleBuscarUsuarioRol}>
        <div style={{ display: 'flex' }}>
          <TextField
            fullWidth
            size="small"
            name="busqueda"
            label="Nombre"
            placeholder="Nombre"
            variant='outlined'
            autoComplete="off"
          />
          <Button variant="contained" type="submit">
            Buscar
          </Button>
        </div>
      </form>
    </>
  )
}
