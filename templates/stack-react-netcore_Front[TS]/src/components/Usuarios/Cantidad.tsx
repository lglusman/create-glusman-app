import { TextField } from "@mui/material"
import { useUsuariosStore } from "../../services/Stores/useUsuariosStore"

export const Cantidad = () => {
  const cantidad = useUsuariosStore((state) => state.Opciones.cant)
  const setCantidad = useUsuariosStore((state) => state.SetCantidad)

  return (
    <>
      <TextField label="Cantidad" value={cantidad} size="small" onChange={(e) => setCantidad(Number(e.target.value))} />
    </>
  )
}