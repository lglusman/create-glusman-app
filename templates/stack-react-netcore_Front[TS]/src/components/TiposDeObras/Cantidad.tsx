import { TextField } from "@mui/material"
import { useTiposDeObrasStore } from "../../services/Stores/useTiposDeObrasStore"

export const Cantidad = () => {
  const cantidad = useTiposDeObrasStore((state) => state.Opciones.cant)
  const setCantidad = useTiposDeObrasStore((state) => state.SetCantidad)

  return (
    <>
      <TextField label="Cantidad" value={cantidad} size="small" onChange={(e) => setCantidad(Number(e.target.value))} />
    </>
  )
}