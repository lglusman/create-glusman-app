import axios from 'axios'
import Swal from 'sweetalert2'
import { errorCodesDictionary, errorStatusDictionary } from './errorDictionaries'

export default async function interceptorSetup(token: string, expire: number) {
  // interceptar el request y agregar el token
  await axios.interceptors.request.use(
    function (config) {
      if (expire < Date.now()) {
        window.open('/tokenexpirado', '_self')
        return Promise.reject(new Error('Token vencido'))
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  axios.interceptors.response.use(
    function (response) {
      const { data } = response
      if (data?.mensaje) {
        Swal.fire({
          title: !data.resultadoOk ? 'Error...' : '',
          icon: data.resultadoOk ? 'success' : 'error',
          html: data.mensaje,
        })
      }
      return response
    },
    function (error) {
      Swal.fire({
        title: 'Error...',
        icon: 'error',
        html: errorStatusDictionary[error.response?.status] || errorCodesDictionary[error.code] || 'Error desconocido.',
      })
      return Promise.reject(error)
    },
  )
}
