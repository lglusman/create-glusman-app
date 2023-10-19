import { TextField } from "@mui/material"
import { useEdificiosStore } from "../../services/Stores/useEdificiosStore"

export const Cantidad = () => {
  const cantidad = useEdificiosStore((state) => state.Opciones.cant)
  const setCantidad = useEdificiosStore((state) => state.SetCantidad)

  return (
    <>
      <TextField label="Cantidad" value={cantidad} size="small" onChange={(e) => setCantidad(Number(e.target.value))} />
    </>
  )
}