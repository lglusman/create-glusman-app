import { Button, TextField, Typography } from '@mui/material'
import { usePermisosStore } from '../../services'

export const Incluir = () => {
  const SetIncluye = usePermisosStore((state) => state.SetIncluye)
  const SetOrden = usePermisosStore((state) => state.SetOrden)

  const handleIncluye = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const incluir: string = data.get('incluir')?.toString() || ''
    console.log(incluir)
    SetIncluye(incluir)
    SetOrden('id')
  }

  return (
    <>
      <Typography component="h1" variant="h6" mb={1}>
        Incluir
      </Typography>
      <form onSubmit={handleIncluye}>
        <div style={{ display: 'flex' }}>
          <TextField
            fullWidth
            size="medium"
            name="incluir"
            label="Incluir"
            placeholder="Incluir"
            variant="outlined"
            autoComplete="off"
          />
          <Button variant="contained" type="submit">
            Incluir
          </Button>
        </div>
      </form>
    </>
  )
}
