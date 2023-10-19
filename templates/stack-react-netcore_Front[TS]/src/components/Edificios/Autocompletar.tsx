import { useState } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { useDebounce } from '../../hooks'
import { Edificio, useEdificios, useEdificiosStore } from '../../services'

type AutocompletarProps = {
  titulo: string
}
export const Autocompletar = ({ titulo }: AutocompletarProps) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const debouncedSearchTerm = useDebounce(inputValue, 300)
  const { Buscar } = useEdificios()
  const Selecionar = useEdificiosStore((state) => state.Selecionar)

  const query = Buscar(debouncedSearchTerm, { pag: 1, cant: 10, orden: 'id' })

  return (
    <Autocomplete
      size="small"
      noOptionsText="sin resultados..."
      fullWidth
      onChange={(_: React.SyntheticEvent<Element, Event>, newValue: Edificio | null) => {
        if (newValue) {
          Selecionar(newValue)
        }
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
      }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.nombre}
      options={query.data?.data || []}
      loading={query.isLoading}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.nombre}
          </li>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          key={params.id}
          label={titulo}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {query.isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}