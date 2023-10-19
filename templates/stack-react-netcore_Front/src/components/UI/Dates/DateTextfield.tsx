import { TextField } from '@mui/material'

type props = {
  value: string
  InputLabelProps?: { shrink: boolean }
  required?: boolean
  name?: string
  label?: string
  fullWidth?: boolean
}

export const DateTextfield = ({ value, InputLabelProps, required, name, label, fullWidth }: props) => {
  const datevalue = value
    ? value
        .replaceAll('/', '')
        .replaceAll('-', '')
        .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
    : null
  return (
    <TextField
      type="date"
      InputLabelProps={InputLabelProps}
      required={required}
      name={name}
      label={label}
      fullWidth={fullWidth}
      defaultValue={datevalue}
    />
  )
}
