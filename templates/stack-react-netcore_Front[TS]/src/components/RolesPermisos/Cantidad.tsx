import { TextField } from "@mui/material"
import { useRolesPermisosStore } from "../../services/Stores/useRolesPermisosStore"

export const Cantidad = () => {
  const cantidad = useRolesPermisosStore((state) => state.Opciones.cant)
  const setCantidad = useRolesPermisosStore((state) => state.SetCantidad)

  return (
    <>
      <TextField label="Cantidad" value={cantidad} size="medium" onChange={(e) => setCantidad(Number(e.target.value))} />
    </>
  )
}