import { Permiso } from "../services"

const UserKey = 'usr'
export interface UserLogin {
  name: string
  token: string
  permisos: Permiso[]
  expire: number
}

export const persistUser = (value: UserLogin) => {
  window.localStorage.setItem(UserKey, JSON.stringify(value))
}

export const clearUser = () => {
  window.localStorage.removeItem(UserKey)
}

export const EmptyUserState: UserLogin = {
  name: '',
  token: '',
  permisos: [],
  expire: Date.now() - 1000 * 60 * 60 * 24,
}

export const getUser = (): UserLogin => {
  const result = window.localStorage.getItem(UserKey)
  return result ? JSON.parse(result) : EmptyUserState
}
