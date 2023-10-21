import { doDelete, doGet, doPost, doPut } from '..'
import { Paginacion } from '../../Types/paginacion'
import { typeOpciones } from '../../Types/types'
export class NivelEducativo {
  id: number
  descripcionNivelEducativo: string
  orden? : number
  fechaAlta: string
  fechaBaja? : string
  motivoBajaId? : number
  usuarioAltaId: number
  usuarioBajaId? : number
  fechaModificacion? : string
  usuarioModificacionId? : number
   constructor() {
    this.id = 0;
    this.descripcionNivelEducativo = "";
    this.orden = 0;
    this.fechaAlta = "";
    this.fechaBaja = "";
    this.motivoBajaId = 0;
    this.usuarioAltaId = 0;
    this.usuarioBajaId = 0;
    this.fechaModificacion = "";
    this.usuarioModificacionId = 0;
  }
  static async TraerUno(id: number, { inc = '', cant = 0, pag = 0, orden = '' }: typeOpciones): Promise<Paginacion<NivelEducativo> | null> {
    return await doGet(`/NivelesEducativos/${id}?inc=${inc}&cant=${cant}&pag=${pag}&orden=${orden}`)
  }
  static async TraerTodos({ inc = '', cant = 0, pag = 0, orden = '' }: typeOpciones): Promise<Paginacion<NivelEducativo> | null> {
    return await doGet(`/NivelesEducativos?inc=${inc}&cant=${cant}&pag=${pag}&orden=${orden}`)
  }
  static async Buscar(busqueda: string, { inc = '', cant = 0, pag = 0, orden = '' }: typeOpciones): Promise<Paginacion<NivelEducativo> | null> {
    if (busqueda === undefined || busqueda === null || busqueda === '') {
      return null
    }
    const ret = await doGet(`/NivelesEducativos/${busqueda}__ax?inc=${inc}&cant=${cant}&pag=${pag}&orden=${orden}`)
     return ret
   }
   static async Guardar(entidad: NivelEducativo) {
      let resp: Paginacion<NivelEducativo>
      if (entidad.id > 0) {
         resp = await doPut(`/NivelesEducativos`, entidad)
      } else {
         resp = await doPost(`/NivelesEducativos`, entidad)
      }
      return resp
   }
   static async Eliminar(id: number) {
      return await doDelete(`/NivelesEducativos`, id)
   }
}