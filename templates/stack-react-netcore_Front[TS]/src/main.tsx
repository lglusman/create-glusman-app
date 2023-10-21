import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Root } from './Root'
import { ThemeCtxProvider } from './theme'
// import store from './redux/store'
// import { Provider } from 'react-redux'

// interceptorSetup()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeCtxProvider>
            <Root />
          </ThemeCtxProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SnackbarProvider>
    {/* </Provider> */}
  </React.StrictMode>,
)
