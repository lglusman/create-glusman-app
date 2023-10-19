import { useRolesPermisosStore } from "../../services/Stores/useRolesPermisosStore"

export const Seleccionado = () => {
  const Seleccionado = useRolesPermisosStore((state) => state.Seleccionado)

  return (
    <pre>
    {
      JSON.stringify(Seleccionado, null, 2)
    }
    </pre>
  )
}