import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAlerts } from '../../components'
import { Usuario } from '../Entidades/Usuario'
import { useUsuariosStore } from '../Stores/useUsuariosStore'
import { typeOpciones } from '../../Types/types'

const queryKey = 'usuarios'

export function useUsuarios() {
  const Opciones = useUsuariosStore((state) => state.Opciones)
  const Selecionar = useUsuariosStore((state) => state.Selecionar)

  const queryClient = useQueryClient()
  const { alertSuccess, alertError } = useAlerts()
  const TraerUno = (id: number, opciones?: typeOpciones) => {
    const ops = {
      ...Opciones,
    }
    ops.cant = opciones?.cant ?? ops.cant
    ops.inc = opciones?.inc ?? ops.inc
    ops.pag = opciones?.pag ?? ops.pag
    ops.orden = opciones?.orden ?? ops.orden
    return useQuery({
      queryKey: [queryKey, id, JSON.stringify(ops)],
      queryFn: () => Usuario.TraerUno(id, ops),
    })
  }
  const TraerTodos = (opciones?: typeOpciones) => {
    const ops = {
      ...Opciones,
    }
    ops.cant = opciones?.cant ?? ops.cant
    ops.inc = opciones?.inc ?? ops.inc
    ops.pag = opciones?.pag ?? ops.pag
    ops.orden = opciones?.orden ?? ops.orden
    return useQuery({
      queryKey: [queryKey, JSON.stringify(ops)],
      queryFn: () => Usuario.TraerTodos(ops),
    })
  }
  const Buscar = (Busqueda: string, opciones?: typeOpciones) => {
    const ops = {
      ...Opciones,
    }
    ops.cant = opciones?.cant ?? ops.cant
    ops.inc = opciones?.inc ?? ops.inc
    ops.pag = opciones?.pag ?? ops.pag
    ops.orden = opciones?.orden ?? ops.orden
    return useQuery({
      queryKey: [queryKey, 'busqueda', Busqueda, JSON.stringify(ops)],
      queryFn: () => Usuario.Buscar(Busqueda, ops),
      enabled: Busqueda.length > 0,
      staleTime: 1000 * 60 * 3,
    })
  }
  const { mutate: Guardar } = useMutation({
    mutationFn: (usuario: Usuario) => Usuario.Guardar(usuario),
    onSuccess: (data) => {
      if (data?.data) {
        queryClient.invalidateQueries([queryKey])
        alertSuccess('Entidad guardada correctamente')
        if (data?.data.length > 0) Selecionar(data?.data[0])
      }
    },
    onError: (err) => {
      alertError(err)
    },
  })
  const { mutate: Eliminar } = useMutation({
    mutationFn: (id: number) => Usuario.Eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey])
      alertSuccess('Entidad guardada correctamente')
    },
    onError: (err) => {
      alertError(err)
    },
  })
  return {
    TraerUno,
    TraerTodos,
    Buscar,
    Guardar,
    Eliminar,
  }
}
