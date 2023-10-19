import { usePermisosStore } from "../../services/Stores/usePermisosStore"

export const Seleccionado = () => {
  const Seleccionado = usePermisosStore((state) => state.Seleccionado)

  return (
    <pre>
    {
      JSON.stringify(Seleccionado, null, 2)
    }
    </pre>
  )
}