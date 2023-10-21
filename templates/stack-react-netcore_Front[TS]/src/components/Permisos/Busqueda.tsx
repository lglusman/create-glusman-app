import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { usePermisos } from '../../services'
import { usePermisosStore } from '../../services/Stores/usePermisosStore'

export const Busqueda = () => {
  const { Buscar } = usePermisos()
  const setData = usePermisosStore((state) => state.SetData)
  const SetPagina = usePermisosStore((state) => state.SetPagina)
  const Opciones = usePermisosStore((state) => state.Opciones)
  const SetBusqueda = usePermisosStore((state) => state.SetBusqueda)
  const Busqueda = usePermisosStore((state) => state.Busqueda)

  const handleBuscarPermiso = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleBuscarPermiso}>
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
