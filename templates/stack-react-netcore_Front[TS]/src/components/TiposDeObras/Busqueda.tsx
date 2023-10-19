import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useTiposDeObras } from '../../services'
import { useTiposDeObrasStore } from '../../services/Stores/useTiposDeObrasStore'

export const Busqueda = () => {
  const { Buscar } = useTiposDeObras()
  const setData = useTiposDeObrasStore((state) => state.SetData)
  const SetPagina = useTiposDeObrasStore((state) => state.SetPagina)
  const Opciones = useTiposDeObrasStore((state) => state.Opciones)
  const SetBusqueda = useTiposDeObrasStore((state) => state.SetBusqueda)
  const Busqueda = useTiposDeObrasStore((state) => state.Busqueda)

  const handleBuscarTipoDeObra = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleBuscarTipoDeObra}>
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
