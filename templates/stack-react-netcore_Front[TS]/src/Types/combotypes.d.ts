
export type comboProps = {
  value?: number
  name?: string
  onChange?: (id: number) => void
  disabled?: boolean
  bind: ChangeEvent<HTMLInputElement>
}

interface InputProps
  extends Partial<Pick<UseFormMethods, "register" | "errors">> {
    value?: number
    name?: string
    // onChange?: (id: number) => void
    disabled?: boolean
}