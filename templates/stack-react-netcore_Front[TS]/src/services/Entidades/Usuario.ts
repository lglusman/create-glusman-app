import { doDelete, doGet, doPost, doPut } from '..'
import { UsuarioLogin } from '../../Types/cualquierTipo'
import { Paginacion } from '../../Types/paginacion'
import { AutorizacionResponse, typeOpciones } from '../../Types/types'
import { UsuarioRol } from './UsuarioRol'
export class Usuario {
  id: number
  nombre: string
  userName: string
  password: string
  fechaAlta: string
  usuarioAltaId: number
  fechaBaja?: string
  usuarioBajaId?: number
  fechaModificacion?: string
  usuarioModificacionId?: number
  usuarioRoles: UsuarioRol[]
  constructor() {
    this.id = 0
    this.nombre = ''
    this.userName = ''
    this.password = ''
    this.fechaAlta = ''
    this.usuarioAltaId = 0
    this.fechaBaja = ''
    this.usuarioBajaId = 0
    this.fechaModificacion = ''
    this.usuarioModificacionId = 0
    this.usuarioRoles = new Array<UsuarioRol>()
  }

  static async Loguear({ username, password }: UsuarioLogin): Promise<Paginacion<AutorizacionResponse>> {
    const consulta = await doPost('/Authentication/Autenticar/', {
      username,
      password,
    })
    return consulta
  }

  static async TraerUno(
    id: number,
    { inc = '', cant = 0, pag = 0, orden = '' }: typeOpciones,
  ): Promise<Paginacion<Usuario> | null> {
    return await doGet(`/Usuarios/${id}?inc=${inc}&cant=${cant}&pag=${pag}&orden=${orden}`)
  }
  static async TraerLogueado(): Promise<Paginacion<Usuario> | null> {
    return await doGet('/usuarios/Logueado')
  }
  static async TraerTodos({
    inc = '',
    cant = 0,
    pag = 0,
    orden = '',
  }: typeOpciones): Promise<Paginacion<Usuario> | null> {
    return await doGet(`/Usuarios?inc=${inc}&cant=${cant}&pag=${pag}&orden=${orden}`)
  }
  static async Buscar(
    busqueda: string,
    { inc = '', cant = 0, pag = 0, orden = '' }: typeOpciones,
  ): Promise<Paginacion<Usuario> | null> {
    if (busqueda === undefined || busqueda === null || busqueda === '') {
      return null
    }
    const ret = await doGet(`/Usuarios/${busqueda}__ax?inc=${inc}&cant=${cant}&pag=${pag}&orden=${orden}`)
    return ret
  }
   static async Guardar(entidad: Usuario) {
    let resp: Paginacion<Usuario>
    if (entidad.id > 0) {
      resp = await doPut(`/Usuarios`, entidad)
    } else {
      resp = await doPost(`/Usuarios`, entidad)
    }
    return resp
  }
  static async Eliminar(id: number) {
    return await doDelete(`/Usuarios`, id)
  }
}
