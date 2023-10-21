import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useRoles } from '../../services'
import { useRolesStore } from '../../services/Stores/useRolesStore'

export const Busqueda = () => {
  const { Buscar } = useRoles()
  const setData = useRolesStore((state) => state.SetData)
  const SetPagina = useRolesStore((state) => state.SetPagina)
  const Opciones = useRolesStore((state) => state.Opciones)
  const SetBusqueda = useRolesStore((state) => state.SetBusqueda)
  const Busqueda = useRolesStore((state) => state.Busqueda)

  const handleBuscarRol = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleBuscarRol}>
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
