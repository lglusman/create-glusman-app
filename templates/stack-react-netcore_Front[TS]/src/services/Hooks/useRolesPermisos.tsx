import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAlerts } from '../../components'
import { RolPermiso } from '../Entidades/RolPermiso'
import { useRolesPermisosStore } from '../Stores/useRolesPermisosStore'
import { typeOpciones } from '../../Types/types'

const queryKey = 'rolespermisos'

export function useRolesPermisos() {
  const Opciones = useRolesPermisosStore((state) => state.Opciones)
  const Selecionar = useRolesPermisosStore((state) => state.Selecionar)

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
      queryFn: () => RolPermiso.TraerUno(id, ops),
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
      queryFn: () => RolPermiso.TraerTodos(ops),
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
      queryFn: () => RolPermiso.Buscar(Busqueda, ops),
      enabled: Busqueda.length > 0,
      staleTime: 1000 * 60 * 3,
    })
  }
  const { mutate: Guardar } = useMutation({
    mutationFn: (rolpermiso: RolPermiso) => RolPermiso.Guardar(rolpermiso),
    onSuccess: (data) => {
      if (data?.data) {
        queryClient.invalidateQueries([queryKey])
        alertSuccess('Entidad guardada correctamente')
        if (data?.data.length > 0) Selecionar(data?.data[0])
      }
    },
    onError: (err) => {
      if (err instanceof Error) alertError(err.message)
      else if (typeof err === 'string') alertError(err)
    },
  })
  const { mutate: Eliminar } = useMutation({
    mutationFn: (id: number) => RolPermiso.Eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey])
      alertSuccess('Entidad guardada correctamente')
    },
    onError: (err) => {
      if (err instanceof Error) alertError(err.message)
      else if (typeof err === 'string') alertError(err)
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
