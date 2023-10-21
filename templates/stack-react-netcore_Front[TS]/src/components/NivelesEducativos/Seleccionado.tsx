import { useNivelesEducativosStore } from "../../services/Stores/useNivelesEducativosStore"

export const Seleccionado = () => {
  const Seleccionado = useNivelesEducativosStore((state) => state.Seleccionado)

  return (
    <pre>
    {
      JSON.stringify(Seleccionado, null, 2)
    }
    </pre>
  )
}