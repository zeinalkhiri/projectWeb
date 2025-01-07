import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const mysqlApi = createApi({
  reducerPath: 'mysqlApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3100/',
  }),
  endpoints(builder) {
    return {
      fetchuser: builder.query({
        providesTags: ['User'] as any,
        query: ({ username, password }) => ({
          url: `/getuser`,
          method: 'POST',
          body: {
            username,
            password,
          },
        }),
      }),
      addUser: builder.mutation({
        invalidatesTags: ['User'] as any,
        query: (user) => {
          return {
            url: '/adduser',
            method: 'POST',
            body: {
              username: user.username,
              password: user.password,
            },
          };
        },
      }),
    };
  },
});
export const { useFetchuserQuery, useAddUserMutation } = mysqlApi;
export { mysqlApi };
