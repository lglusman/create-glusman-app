import { useUsuariosStore } from "../../services/Stores/useUsuariosStore"

export const Seleccionado = () => {
  const Seleccionado = useUsuariosStore((state) => state.Seleccionado)

  return (
    <pre>
    {
      JSON.stringify(Seleccionado, null, 2)
    }
    </pre>
  )
}