import { useTiposDeObrasStore } from "../../services/Stores/useTiposDeObrasStore"

export const Seleccionado = () => {
  const Seleccionado = useTiposDeObrasStore((state) => state.Seleccionado)

  return (
    <pre>
    {
      JSON.stringify(Seleccionado, null, 2)
    }
    </pre>
  )
}