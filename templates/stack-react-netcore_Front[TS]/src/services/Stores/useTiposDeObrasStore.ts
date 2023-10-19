import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Paginacion } from '../../Types/paginacion'
import { typeOpciones } from '../../Types/types'
import { TipoDeObra } from '../Entidades/TipoDeObra'

interface TiposDeObrasState {
  Lista: Paginacion<TipoDeObra> | null
  Seleccionado: TipoDeObra | null
  Busqueda: string
  Opciones: typeOpciones
  SetOpciones: (filtros: typeOpciones) => void
  SetIncluye: (inc: string) => void
  SetCantidad: (cant: number) => void
  SetPagina: (pagina: number) => void
  SetOrden: (orden: string) => void
  SetBusqueda: (busqueda: string) => void
  SetData: (tiposdeobras: Paginacion<TipoDeObra>) => void
  Selecionar: (tipodeobra: TipoDeObra) => void
}

export const useTiposDeObrasStore = create<TiposDeObrasState>()(
  persist(
    (set) => ({
      Lista: null,
      Seleccionado: null,
      Busqueda: '',
      Opciones: {
        inc: '',
        cant: 0,
        pag: 0,
        orden: '',
      },
      SetOpciones: (filtros: typeOpciones) => {
        set((state) => ({ Opciones: { ...state.Opciones, ...filtros } }))
      },
      SetIncluye: (inc: string) => {
        set((state) => ({ Opciones: { ...state.Opciones, inc } }))
      },
      SetCantidad: (cant: number) => {
        set((state) => ({ Opciones: { ...state.Opciones, cant } }))
      },
      SetPagina: (pagina: number) => {
        set((state) => ({ Opciones: { ...state.Opciones, pag: pagina } }))
      },
      SetOrden: (orden: string) => {
        set((state) => ({ Opciones: { ...state.Opciones, orden } }))
      },
      SetBusqueda: (busqueda: string) => {
        set({ Busqueda: busqueda })
      },
      SetData: (tiposdeobras: Paginacion<TipoDeObra>) => {
        set({ Lista: tiposdeobras })
      },
      Selecionar: (tipodeobra: TipoDeObra) => {
        set({ Seleccionado: tipodeobra })
      },
    }),
    {
      name: 'TiposDeObrasStore',
      storage: createJSONStorage(() => sessionStorage)
    },
  ),
)