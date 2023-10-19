import { Typography } from '@mui/material'

export default function Home () {
  return (
    <>
      <Typography
        component='div'
        sx={
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 10

        }
      }
        variant='h2'
      >Bienvenido al sistema
      </Typography>
    </>
  )
}
