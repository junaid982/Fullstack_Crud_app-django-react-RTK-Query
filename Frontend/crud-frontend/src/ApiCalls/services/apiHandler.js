// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const crudApi = createApi({
  reducerPath: 'crudApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({

    // 1 - get All data 
    getAllRecords: builder.query({
      query: () => {
        return {
          url: 'api/emp/get/all/records/',
          method: "GET",
          headers: {
            'Content-type': "application/json"
          }
        }
      }
    }),

    // 2 - Delete Record with record Id 
    removeRecord: builder.mutation({
      query: (id) => {
        return {
          url: `api/emp/delete/record/${id}/`,
          method: 'DELETE',
          headers: {
            'Content-type': "application/json"
          }
        }
      }
    }),



  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllRecordsQuery ,useRemoveRecordMutation} = crudApi