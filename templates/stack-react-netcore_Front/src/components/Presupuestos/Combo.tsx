import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { usePresupuestos } from '../../services'
import { comboProps } from '../../Types/combotypes'

export const Combo = ({ value, name, disabled, bind }: comboProps) => {
  const { TraerTodos } = usePresupuestos()

  const { data, isFetching } = TraerTodos({cant: 0, orden: 'descripcion'})

  if (isFetching) return <div>Cargando...</div>

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="cbopresupuestolbl">presupuesto</InputLabel>
        <Select
          size='small'
          disabled={disabled}
          labelId="cbopresupuestolbl"
          id="cbopresupuesto"
          name={name}
          value={value}
          autoWidth
          label="presupuesto"
          {...bind}
        >
          <MenuItem value={'0'}>--Seleccione--</MenuItem>
          {data?.data?.map((item) => {
            return <MenuItem 
            key={item.id}
            value={item.id.toString()}>{item.descripcion}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}
