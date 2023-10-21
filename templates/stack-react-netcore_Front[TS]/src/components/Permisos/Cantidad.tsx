import { TextField } from "@mui/material"
import { usePermisosStore } from "../../services/Stores/usePermisosStore"

export const Cantidad = () => {
  const cantidad = usePermisosStore((state) => state.Opciones.cant)
  const setCantidad = usePermisosStore((state) => state.SetCantidad)

  return (
    <>
      <TextField label="Cantidad" value={cantidad} size="medium" onChange={(e) => setCantidad(Number(e.target.value))} />
    </>
  )
}