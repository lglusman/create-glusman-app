import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Paginacion } from '../../Types/paginacion'
import { typeOpciones } from '../../Types/types'
import { NivelEducativo } from '../Entidades/NivelEducativo'

interface NivelesEducativosState {
  Lista: Paginacion<NivelEducativo> | null
  Seleccionado: NivelEducativo | null
  Busqueda: string
  Opciones: typeOpciones
  SetOpciones: (filtros: typeOpciones) => void
  SetIncluye: (inc: string) => void
  SetCantidad: (cant: number) => void
  SetPagina: (pagina: number) => void
  SetOrden: (orden: string) => void
  SetBusqueda: (busqueda: string) => void
  SetData: (niveleseducativos: Paginacion<NivelEducativo>) => void
  Selecionar: (niveleducativo: NivelEducativo) => void
}

export const useNivelesEducativosStore = create<NivelesEducativosState>()(
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
      SetData: (niveleseducativos: Paginacion<NivelEducativo>) => {
        set({ Lista: niveleseducativos })
      },
      Selecionar: (niveleducativo: NivelEducativo) => {
        set({ Seleccionado: niveleducativo })
      },
    }),
    {
      name: 'NivelesEducativosStore',
      storage: createJSONStorage(() => sessionStorage)
    },
  ),
)