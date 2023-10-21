import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useNivelesEducativos } from '../../services'
import { comboProps } from '../../Types/combotypes'

export const Combo = ({ value = 0, name, disabled, bind }: comboProps) => {
  const { TraerTodos } = useNivelesEducativos()

  const { data, isFetching } = TraerTodos({cant: 0, orden: 'descripcionNivelEducativo'})

  if (isFetching) return <div>Cargando...</div>

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="cboniveleducativolbl">niveleducativo</InputLabel>
        <Select
          size="medium"
          disabled={disabled}
          labelId="cboniveleducativolbl"
          id="cboniveleducativo"
          name={name}
          value={value}
          autoWidth
          label="niveleducativo"
          {...bind}
        >
          <MenuItem value={'0'}>--Seleccione--</MenuItem>
          {data?.data?.map((item) => {
            return <MenuItem 
            key={item.id}
            value={item.id.toString()}>{item.descripcionNivelEducativo}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}
