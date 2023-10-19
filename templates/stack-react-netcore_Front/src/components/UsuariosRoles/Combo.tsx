import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useUsuariosRoles } from '../../services'
import { comboProps } from '../../Types/combotypes'

export const Combo = ({ value, name, disabled, bind }: comboProps) => {
  const { TraerTodos } = useUsuariosRoles()

  const { data, isFetching } = TraerTodos({cant: 0, orden: 'usuarioId'})

  if (isFetching) return <div>Cargando...</div>

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="cbousuariorollbl">usuariorol</InputLabel>
        <Select
          size='small'
          disabled={disabled}
          labelId="cbousuariorollbl"
          id="cbousuariorol"
          name={name}
          value={value}
          autoWidth
          label="usuariorol"
          {...bind}
        >
          <MenuItem value={'0'}>--Seleccione--</MenuItem>
          {data?.data?.map((item) => {
            return <MenuItem 
            key={item.id}
            value={item.id.toString()}>{item.usuarioId}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}
