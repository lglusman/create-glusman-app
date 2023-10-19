import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { styled } from '@mui/system'

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'Calc(50vh)',
  gap: '16px'
})

export default function Page404 () {
  return (
    <Wrapper>
      <Typography variant='h2'>404</Typography>
      <Typography variant='h4'>Página no encontrada</Typography>
      <Typography variant='body1'>Lo sentimos, la página que estás buscando no existe.</Typography>
      <Button variant='contained' component={Link} to='/' color='primary'>
        Volver a la página principal
      </Button>
    </Wrapper>
  )
}
