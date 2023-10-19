import { TextField } from "@mui/material"
import { useRolesStore } from "../../services/Stores/useRolesStore"

export const Cantidad = () => {
  const cantidad = useRolesStore((state) => state.Opciones.cant)
  const setCantidad = useRolesStore((state) => state.SetCantidad)

  return (
    <>
      <TextField label="Cantidad" value={cantidad} size="small" onChange={(e) => setCantidad(Number(e.target.value))} />
    </>
  )
}