import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

import { crudApi } from '../services/apiHandler'


export const store = configureStore({
  reducer: {
    
    [crudApi.reducerPath]: crudApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(crudApi.middleware),
})

setupListeners(store.dispatch)