import { create } from 'zustand'
import { UserLogin, clearUser, getUser, persistUser } from '../../utilities'

interface UserState {
  User: UserLogin | null
  createUser: (value: UserLogin) => void
  updateUser: (value: UserLogin) => void
  resetUser: () => void
}

export const useUserStore = create<UserState>()((set) => ({
  User: getUser(),
  createUser: (value: UserLogin) => {
    persistUser(value)
    set ({ User: value })
  },
  updateUser: (value: UserLogin) => {
    persistUser(value)
    set ({ User: value })
  },
  resetUser: () => {
    clearUser()
    set ({ User: null })
  },
}))

