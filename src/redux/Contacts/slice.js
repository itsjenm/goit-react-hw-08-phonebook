import { createSlice } from '@reduxjs/toolkit';
import { deleteContact, fetchContacts, addContact } from './operators';
const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  }
};

const contactsReducer = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //* Get Contacts
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      })
      // * Add Contact
      .addCase(addContact.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items.push(action.payload);
        console.log(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      })
      //* Delete Contact
      .addCase(deleteContact.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(contact => contact.id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      });
  },
});

export default contactsReducer.reducer;