import { usePresupuestosStore } from "../../services/Stores/usePresupuestosStore"

export const Seleccionado = () => {
  const Seleccionado = usePresupuestosStore((state) => state.Seleccionado)

  return (
    <pre>
    {
      JSON.stringify(Seleccionado, null, 2)
    }
    </pre>
  )
}