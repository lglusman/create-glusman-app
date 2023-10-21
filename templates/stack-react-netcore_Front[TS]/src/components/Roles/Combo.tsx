import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useRoles } from '../../services'
import { comboProps } from '../../Types/combotypes'

export const Combo = ({ value = 0, name, disabled, bind }: comboProps) => {
  const { TraerTodos } = useRoles()

  const { data, isFetching } = TraerTodos({cant: 0, orden: 'descripcionRol'})

  if (isFetching) return <div>Cargando...</div>

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="cborollbl">rol</InputLabel>
        <Select
          size="medium"
          disabled={disabled}
          labelId="cborollbl"
          id="cborol"
          name={name}
          value={value}
          autoWidth
          label="rol"
          {...bind}
        >
          <MenuItem value={'0'}>--Seleccione--</MenuItem>
          {data?.data?.map((item) => {
            return <MenuItem 
            key={item.id}
            value={item.id.toString()}>{item.descripcionRol}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}
