import { TextField } from "@mui/material"
import { useSitiosStore } from "../../services/Stores/useSitiosStore"

export const Cantidad = () => {
  const cantidad = useSitiosStore((state) => state.Opciones.cant)
  const setCantidad = useSitiosStore((state) => state.SetCantidad)

  return (
    <>
      <TextField label="Cantidad" value={cantidad} size="medium" onChange={(e) => setCantidad(Number(e.target.value))} />
    </>
  )
}