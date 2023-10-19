import { useRolesStore } from "../../services/Stores/useRolesStore"

export const Seleccionado = () => {
  const Seleccionado = useRolesStore((state) => state.Seleccionado)

  return (
    <pre>
    {
      JSON.stringify(Seleccionado, null, 2)
    }
    </pre>
  )
}