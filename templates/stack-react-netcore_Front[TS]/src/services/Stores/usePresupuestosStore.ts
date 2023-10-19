import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Paginacion } from '../../Types/paginacion'
import { typeOpciones } from '../../Types/types'
import { Presupuesto } from '../Entidades/Presupuesto'

interface PresupuestosState {
  Lista: Paginacion<Presupuesto> | null
  Seleccionado: Presupuesto | null
  Busqueda: string
  Opciones: typeOpciones
  SetOpciones: (filtros: typeOpciones) => void
  SetIncluye: (inc: string) => void
  SetCantidad: (cant: number) => void
  SetPagina: (pagina: number) => void
  SetOrden: (orden: string) => void
  SetBusqueda: (busqueda: string) => void
  SetData: (presupuestos: Paginacion<Presupuesto>) => void
  Selecionar: (presupuesto: Presupuesto) => void
}

export const usePresupuestosStore = create<PresupuestosState>()(
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
      SetData: (presupuestos: Paginacion<Presupuesto>) => {
        set({ Lista: presupuestos })
      },
      Selecionar: (presupuesto: Presupuesto) => {
        set({ Seleccionado: presupuesto })
      },
    }),
    {
      name: 'PresupuestosStore',
      storage: createJSONStorage(() => sessionStorage)
    },
  ),
)