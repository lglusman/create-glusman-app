import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useTiposDeObras } from '../../services'
import { comboProps } from '../../Types/combotypes'

export const Combo = ({ value, name, disabled, bind }: comboProps) => {
  const { TraerTodos } = useTiposDeObras()

  const { data, isFetching } = TraerTodos({cant: 0, orden: 'tipo'})

  if (isFetching) return <div>Cargando...</div>

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="cbotipodeobralbl">tipodeobra</InputLabel>
        <Select
          size='small'
          disabled={disabled}
          labelId="cbotipodeobralbl"
          id="cbotipodeobra"
          name={name}
          value={value}
          autoWidth
          label="tipodeobra"
          {...bind}
        >
          <MenuItem value={'0'}>--Seleccione--</MenuItem>
          {data?.data?.map((item) => {
            return <MenuItem 
            key={item.id}
            value={item.id.toString()}>{item.tipo}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}
