import { useSitiosStore } from "../../services/Stores/useSitiosStore"

export const Seleccionado = () => {
  const Seleccionado = useSitiosStore((state) => state.Seleccionado)

  return (
    <pre>
    {
      JSON.stringify(Seleccionado, null, 2)
    }
    </pre>
  )
}