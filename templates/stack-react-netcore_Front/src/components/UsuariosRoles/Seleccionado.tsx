import { useUsuariosRolesStore } from "../../services/Stores/useUsuariosRolesStore"

export const Seleccionado = () => {
  const Seleccionado = useUsuariosRolesStore((state) => state.Seleccionado)

  return (
    <pre>
    {
      JSON.stringify(Seleccionado, null, 2)
    }
    </pre>
  )
}