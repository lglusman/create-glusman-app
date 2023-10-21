import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useUsuarios } from '../../services'
import { comboProps } from '../../Types/combotypes'

export const Combo = ({ value = 0, name, disabled, bind }: comboProps) => {
  const { TraerTodos } = useUsuarios()

  const { data, isFetching } = TraerTodos({cant: 0, orden: 'nombre'})

  if (isFetching) return <div>Cargando...</div>

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="cbousuariolbl">usuario</InputLabel>
        <Select
          size="medium"
          disabled={disabled}
          labelId="cbousuariolbl"
          id="cbousuario"
          name={name}
          value={value}
          autoWidth
          label="usuario"
          {...bind}
        >
          <MenuItem value={'0'}>--Seleccione--</MenuItem>
          {data?.data?.map((item) => {
            return <MenuItem 
            key={item.id}
            value={item.id.toString()}>{item.nombre}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}
