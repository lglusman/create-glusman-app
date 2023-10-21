import { TextField } from "@mui/material"
import { useNivelesEducativosStore } from "../../services/Stores/useNivelesEducativosStore"

export const Cantidad = () => {
  const cantidad = useNivelesEducativosStore((state) => state.Opciones.cant)
  const setCantidad = useNivelesEducativosStore((state) => state.SetCantidad)

  return (
    <>
      <TextField label="Cantidad" value={cantidad} size="medium" onChange={(e) => setCantidad(Number(e.target.value))} />
    </>
  )
}