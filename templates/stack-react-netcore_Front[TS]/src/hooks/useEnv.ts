export const useEnv = () => {
  const env = import.meta.env.VITE_ENV || 'development'
  const isDevelopment = env === 'development'

  // VITE_AXIOS_DEV_BASE_URL = 'http://localhost:45678/api'
  // VITE_AXIOS_DEV_BACKEND_URL = 'http://localhost:45678'
  // VITE_AXIOS_DEV_PORTAL_URL = 'http://localhost:4000/Redirect'
  // VITE_AXIOS_DEV_LOGIN_URL = 'http://localhost:4000/login'

  // VITE_AXIOS_PROD_BASE_URL = 'http://lglusman.duckdns.org:8080/api'
  // VITE_AXIOS_PROD_BACKEND_URL = 'http://lglusman.duckdns.org:8080'
  // VITE_AXIOS_PROD_PORTAL_URL = 'http://lglusman.duckdns.org:4000/Redirect'
  // VITE_AXIOS_PROD_LOGIN_URL = 'http://lglusman.duckdns.org:4000/login'

  // VITE_ID_SITIO = 2

  return {
    IdSitio: import.meta.env.VITE_ID_SITIO,
    BaseURL: isDevelopment ? import.meta.env.VITE_AXIOS_DEV_BASE_URL : import.meta.env.VITE_AXIOS_PROD_BASE_URL,
    BackendURL: isDevelopment
      ? import.meta.env.VITE_AXIOS_DEV_BACKEND_URL
      : import.meta.env.VITE_AXIOS_PROD_BACKEND_URL,
    PortalURL: isDevelopment ? import.meta.env.VITE_AXIOS_DEV_PORTAL_URL : import.meta.env.VITE_AXIOS_PROD_PORTAL_URL,
    LoginURL: isDevelopment ? import.meta.env.VITE_AXIOS_DEV_LOGIN_URL : import.meta.env.VITE_AXIOS_PROD_LOGIN_URL,
  }
}
