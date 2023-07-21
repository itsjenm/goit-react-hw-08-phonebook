// import { createSlice } from '@reduxjs/toolkit';
// import { deleteContact, getContacts, addContact } from './operators';
// const initialState = {
//   contacts: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   filter: '',
// };

// const contactsReducer = createSlice({
//   name: 'contacts',
//   initialState,
//   reducers: {
//     changeFilter: (state, action) => {
//       state.filter = action.payload;
//     },
//   },
//   extraReducers: builder => {
//     //* Get Contacts
//     builder
//       .addCase(getContacts.pending, state => {
//         state.contacts.isLoading = true;
//       })
//       .addCase(getContacts.fulfilled, (state, action) => {
//         state.contacts.isLoading = false;
//         state.contacts.items = action.payload;
//       })
//       .addCase(getContacts.rejected, (state, action) => {
//         state.contacts.error = action.payload;
//         state.contacts.isLoading = false;
//       })
//       // * Add Contact
//       .addCase(addContact.pending, state => {
//         state.contacts.isLoading = true;
//       })
//       .addCase(addContact.fulfilled, (state, action) => {
//         state.contacts.isLoading = false;
//         state.contacts.items.push(action.payload);
//       })
//       .addCase(addContact.rejected, (state, action) => {
//         state.contacts.error = action.payload;
//         state.contacts.isLoading = false;
//       })
//       //* Delete Contact
//       .addCase(deleteContact.pending, state => {
//         state.contacts.isLoading = true;
//       })
//       .addCase(deleteContact.fulfilled, (state, action) => {
//         state.contacts.isLoading = false;
//         const index = state.contacts.items.findIndex(contact => contact.id === action.payload.id);
//         state.contacts.splice(index, 1);
//       })
//       .addCase(deleteContact.rejected, (state, action) => {
//         state.contacts.error = action.payload;
//         state.contacts.isLoading = false;
//       });
//   },
// });

// export const { changeFilter } = contactsReducer.actions;
// export default contactsReducer.reducer;