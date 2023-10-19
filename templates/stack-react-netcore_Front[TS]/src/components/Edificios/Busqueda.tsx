import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useEdificios } from '../../services'
import { useEdificiosStore } from '../../services/Stores/useEdificiosStore'

export const Busqueda = () => {
  const { Buscar } = useEdificios()
  const setData = useEdificiosStore((state) => state.SetData)
  const SetPagina = useEdificiosStore((state) => state.SetPagina)
  const Opciones = useEdificiosStore((state) => state.Opciones)
  const SetBusqueda = useEdificiosStore((state) => state.SetBusqueda)
  const Busqueda = useEdificiosStore((state) => state.Busqueda)

  const handleBuscarEdificio = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleBuscarEdificio}>
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
