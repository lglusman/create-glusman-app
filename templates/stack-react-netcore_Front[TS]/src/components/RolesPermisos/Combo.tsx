import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useRolesPermisos } from '../../services'
import { comboProps } from '../../Types/combotypes'

export const Combo = ({ value = 0, name, disabled, bind }: comboProps) => {
  const { TraerTodos } = useRolesPermisos()

  const { data, isFetching } = TraerTodos({cant: 0, orden: 'rolId'})

  if (isFetching) return <div>Cargando...</div>

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="cborolpermisolbl">rolpermiso</InputLabel>
        <Select
          size="medium"
          disabled={disabled}
          labelId="cborolpermisolbl"
          id="cborolpermiso"
          name={name}
          value={value}
          autoWidth
          label="rolpermiso"
          {...bind}
        >
          <MenuItem value={'0'}>--Seleccione--</MenuItem>
          {data?.data?.map((item) => {
            return <MenuItem 
            key={item.id}
            value={item.id.toString()}>{item.rolId}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}
