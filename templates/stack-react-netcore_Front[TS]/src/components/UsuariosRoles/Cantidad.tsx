import { TextField } from "@mui/material"
import { useUsuariosRolesStore } from "../../services/Stores/useUsuariosRolesStore"

export const Cantidad = () => {
  const cantidad = useUsuariosRolesStore((state) => state.Opciones.cant)
  const setCantidad = useUsuariosRolesStore((state) => state.SetCantidad)

  return (
    <>
      <TextField label="Cantidad" value={cantidad} size="medium" onChange={(e) => setCantidad(Number(e.target.value))} />
    </>
  )
}