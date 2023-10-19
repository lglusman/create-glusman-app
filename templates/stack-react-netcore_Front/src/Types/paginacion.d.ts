export class clPaginacion<T> {
  data: T[]
  totalRegistros: number
  tamanoPagina: number
  paginaActual: number
  paginaSiguiente: number | null
  paginaAnterior: number | null
} 

export interface Paginacion<T> {
  data: T[]
  totalRegistros: number
  tamanoPagina: number
  paginaActual: number
  paginaSiguiente: number | null
  paginaAnterior: number | null
} 

export interface DataPaginada<T> {
  data: T
} 


