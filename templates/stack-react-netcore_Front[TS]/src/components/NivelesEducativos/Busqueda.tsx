import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useNivelesEducativos } from '../../services'
import { useNivelesEducativosStore } from '../../services/Stores/useNivelesEducativosStore'

export const Busqueda = () => {
  const { Buscar } = useNivelesEducativos()
  const setData = useNivelesEducativosStore((state) => state.SetData)
  const SetPagina = useNivelesEducativosStore((state) => state.SetPagina)
  const Opciones = useNivelesEducativosStore((state) => state.Opciones)
  const SetBusqueda = useNivelesEducativosStore((state) => state.SetBusqueda)
  const Busqueda = useNivelesEducativosStore((state) => state.Busqueda)

  const handleBuscarNivelEducativo = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleBuscarNivelEducativo}>
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
