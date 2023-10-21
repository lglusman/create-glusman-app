import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { usePermisos } from '../../services'
import { comboProps } from '../../Types/combotypes'

export const Combo = ({ value = 0, name, disabled, bind }: comboProps) => {
  const { TraerTodos } = usePermisos()

  const { data, isFetching } = TraerTodos({cant: 0, orden: 'sitioId'})

  if (isFetching) return <div>Cargando...</div>

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="cbopermisolbl">permiso</InputLabel>
        <Select
          size="medium"
          disabled={disabled}
          labelId="cbopermisolbl"
          id="cbopermiso"
          name={name}
          value={value}
          autoWidth
          label="permiso"
          {...bind}
        >
          <MenuItem value={'0'}>--Seleccione--</MenuItem>
          {data?.data?.map((item) => {
            return <MenuItem 
            key={item.id}
            value={item.id.toString()}>{item.sitioId}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}
