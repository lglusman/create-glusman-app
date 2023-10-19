import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useSitios } from '../../services'
import { comboProps } from '../../Types/combotypes'

export const Combo = ({ value, name, disabled, bind }: comboProps) => {
  const { TraerTodos } = useSitios()

  const { data, isFetching } = TraerTodos({cant: 0, orden: 'descripcionSitio'})

  if (isFetching) return <div>Cargando...</div>

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="cbositiolbl">sitio</InputLabel>
        <Select
          size='small'
          disabled={disabled}
          labelId="cbositiolbl"
          id="cbositio"
          name={name}
          value={value}
          autoWidth
          label="sitio"
          {...bind}
        >
          <MenuItem value={'0'}>--Seleccione--</MenuItem>
          {data?.data?.map((item) => {
            return <MenuItem 
            key={item.id}
            value={item.id.toString()}>{item.descripcionSitio}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}
