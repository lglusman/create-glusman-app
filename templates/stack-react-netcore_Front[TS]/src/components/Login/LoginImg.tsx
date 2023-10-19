import { useEffect, useState } from 'react'
import Imagen1 from '../../assets/1.svg'
import Imagen2 from '../../assets/2.svg'
import Imagen3 from '../../assets/3.svg'
import Imagen4 from '../../assets/4.svg'
import Imagen5 from '../../assets/5.svg'
import Imagen6 from '../../assets/6.svg'
import Imagen7 from '../../assets/7.svg'

export const LoginImg = () => {
  const [imagen, setimagen] = useState("")

  useEffect(() => {
    const images = [Imagen1, Imagen2, Imagen3, Imagen4, Imagen5, Imagen6, Imagen7]
    const random = Math.floor(Math.random() * images.length)
    setimagen(images[random])
  }, [])

  return (
    <img src={imagen} alt='Imagen' className='imgResponsive' />
  )
}
