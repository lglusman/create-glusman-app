import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useUsuarios } from '../../services'
import { useUsuariosStore } from '../../services/Stores/useUsuariosStore'

export const Busqueda = () => {
  const { Buscar } = useUsuarios()
  const setData = useUsuariosStore((state) => state.SetData)
  const SetPagina = useUsuariosStore((state) => state.SetPagina)
  const Opciones = useUsuariosStore((state) => state.Opciones)
  const SetBusqueda = useUsuariosStore((state) => state.SetBusqueda)
  const Busqueda = useUsuariosStore((state) => state.Busqueda)

  const handleBuscarUsuario = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleBuscarUsuario}>
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
