import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { usePresupuestos } from '../../services'
import { usePresupuestosStore } from '../../services/Stores/usePresupuestosStore'

export const Busqueda = () => {
  const { Buscar } = usePresupuestos()
  const setData = usePresupuestosStore((state) => state.SetData)
  const SetPagina = usePresupuestosStore((state) => state.SetPagina)
  const Opciones = usePresupuestosStore((state) => state.Opciones)
  const SetBusqueda = usePresupuestosStore((state) => state.SetBusqueda)
  const Busqueda = usePresupuestosStore((state) => state.Busqueda)

  const handleBuscarPresupuesto = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleBuscarPresupuesto}>
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
