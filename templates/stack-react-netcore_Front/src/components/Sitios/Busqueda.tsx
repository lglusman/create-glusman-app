import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useSitios } from '../../services'
import { useSitiosStore } from '../../services/Stores/useSitiosStore'

export const Busqueda = () => {
  const { Buscar } = useSitios()
  const setData = useSitiosStore((state) => state.SetData)
  const SetPagina = useSitiosStore((state) => state.SetPagina)
  const Opciones = useSitiosStore((state) => state.Opciones)
  const SetBusqueda = useSitiosStore((state) => state.SetBusqueda)
  const Busqueda = useSitiosStore((state) => state.Busqueda)

  const handleBuscarSitio = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleBuscarSitio}>
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
