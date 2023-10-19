import { Usuario } from "../services/Entidades/Usuario"

export interface AutorizacionResponse {
  token: string
  usuario: Usuario
}

export type typeOpciones = {
  inc?: string
  cant?: number
  pag?: number
  orden?: string
}

export type typeBusqueda = {
  busqueda: string
  incluye: string?
}