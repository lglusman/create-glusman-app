import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useEdificios } from '../../services'
import { comboProps } from '../../Types/combotypes'

export const Combo = ({ value, name, disabled, bind }: comboProps) => {
  const { TraerTodos } = useEdificios()

  const { data, isFetching } = TraerTodos({cant: 0, orden: 'nombre'})

  if (isFetching) return <div>Cargando...</div>

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="cboedificiolbl">edificio</InputLabel>
        <Select
          size='small'
          disabled={disabled}
          labelId="cboedificiolbl"
          id="cboedificio"
          name={name}
          value={value}
          autoWidth
          label="edificio"
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
