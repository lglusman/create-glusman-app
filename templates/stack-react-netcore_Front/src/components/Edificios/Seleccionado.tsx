import { useEdificiosStore } from "../../services/Stores/useEdificiosStore"

export const Seleccionado = () => {
  const Seleccionado = useEdificiosStore((state) => state.Seleccionado)

  return (
    <pre>
    {
      JSON.stringify(Seleccionado, null, 2)
    }
    </pre>
  )
}