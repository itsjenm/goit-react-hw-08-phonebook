// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const contactsApi = createApi({
//   reducerPath: 'contacts',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://connections-api.herokuapp.com',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState();
//       console.log('Token:', token); // Check if the token is correctly retrieved
//       if (token) {
//         headers.set('authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['Contact'],
//   endpoints: buider => ({
//     getContacts: buider.query({
//       query: () => '/contacts',
//       keepUnusedDataFor: 1,
//       providesTags: ['Contacts'],
//     }),
//     addContact: buider.mutation({
//       query: data => ({
//         url: '/contacts',
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Contacts'],
//     }),
//     deleteContact: buider.mutation({
//       query: id => ({
//         url: `/contacts/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Contacts'],
//     }),
//   }),
// });

// export const {
//   useGetContactsQuery,
//   useAddContactMutation,
//   useDeleteContactMutation,
// } = contactsApi;
