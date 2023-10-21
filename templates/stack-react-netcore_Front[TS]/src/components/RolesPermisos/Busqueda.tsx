import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useRolesPermisos } from '../../services'
import { useRolesPermisosStore } from '../../services/Stores/useRolesPermisosStore'

export const Busqueda = () => {
  const { Buscar } = useRolesPermisos()
  const setData = useRolesPermisosStore((state) => state.SetData)
  const SetPagina = useRolesPermisosStore((state) => state.SetPagina)
  const Opciones = useRolesPermisosStore((state) => state.Opciones)
  const SetBusqueda = useRolesPermisosStore((state) => state.SetBusqueda)
  const Busqueda = useRolesPermisosStore((state) => state.Busqueda)

  const handleBuscarRolPermiso = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleBuscarRolPermiso}>
        <div style={{ display: 'flex' }}>
          <TextField
            fullWidth
            size="medium"
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
