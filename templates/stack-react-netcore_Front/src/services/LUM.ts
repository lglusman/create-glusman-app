import axios from 'axios'

axios.defaults.baseURL =
  import.meta.env.VITE_ENV === 'development'
    ? import.meta.env.VITE_AXIOS_DEV_BASE_URL
    : import.meta.env.VITE_AXIOS_PROD_BASE_URL

export async function doGet(url: string) {
  try {
    const { data } = await axios.get(url)
    return data.data
  } catch (error) {
    console.error('doGet error:', error)
  }
}

export async function doPost(url: string, entidad: unknown) {
  try {
    const { data } = await axios.post(url, entidad)
    return data.data
  } catch (error) {
    console.error('doPost error:', error)
  }
}
export async function doPostImage(url: string, imagen: File) {
  try {
    const formData = new FormData()
    formData.append('image', imagen)
    // const { data } = await axios.post(url, formData, {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // })
    const { data } = await axios.post(url, formData)
    return data.data
  } catch (error) {
    console.error('doPost error:', error)
  }
}
export async function doPut(url: string, entidad?: unknown) {
  try {
    const { data } = await axios.put(url, entidad)
    return data.data
  } catch (error) {
    console.error('doPut error:', error)
  }
}
export async function doDelete(url: string, id: number) {
  try {
    const { data } = await axios.delete(`${url}/${id}`)
    return data.data
  } catch (error) {
    console.error('doDelete error:', error)
  }
}
export function datetoDDMMYYYY(date: string, separador = '-') {
  if (date && date !== '') {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) {
      month = '0' + month
    }
    if (day.length < 2) {
      day = '0' + day
    }

    // return [year, month, day].join('-');
    return [day, month, year].join(separador)
  }
}
export function datetoYYYYMMDD(date: string) {
  if (date && date !== '') {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) {
      month = '0' + month
    }
    if (day.length < 2) {
      day = '0' + day
    }

    // return [year, month, day].join('-');
    return [year, month, day].join('-')
  }
}
export function datetoDDMMYYYYHHMMSS(date: string) {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()
  const hours = d.getHours()
  let mins = '' + d.getMinutes()
  let secs = '' + d.getSeconds()

  if (month.length < 2) {
    month = '0' + month
  }
  if (day.length < 2) {
    day = '0' + day
  }

  if (mins.length < 2) {
    mins = '0' + mins
  }
  if (secs.length < 2) {
    secs = '0' + secs
  }

  const dia = [day, month, year].join('-')
  const hora = [hours, mins, secs].join(':')
  return `${dia} ${hora}`
}
// recibe 'yyyy-mm-dd' y devuelve 'dd-mm-yyyy'
export function dataStringToDDMMYYYY(date: string) {
  let ret = ''
  if (date) {
    const spl = date.split('-')
    if (spl.length === 3) {
      ret = [spl[2], spl[1], spl[0]].join('/')
    }
  }
  return ret
}

export function dynamicSort(property: string) {
  let sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function (a: { [x: string]: string }, b: { [x: string]: string }) {
    const aproperty = a[property] || ''
    const bproperty = b[property] || ''

    const result = aproperty < bproperty ? -1 : aproperty > bproperty ? 1 : 0
    return result * sortOrder
  }
}
