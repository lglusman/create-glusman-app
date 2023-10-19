import { TextField } from "@mui/material"
import { usePresupuestosStore } from "../../services/Stores/usePresupuestosStore"

export const Cantidad = () => {
  const cantidad = usePresupuestosStore((state) => state.Opciones.cant)
  const setCantidad = usePresupuestosStore((state) => state.SetCantidad)

  return (
    <>
      <TextField label="Cantidad" value={cantidad} size="small" onChange={(e) => setCantidad(Number(e.target.value))} />
    </>
  )
}