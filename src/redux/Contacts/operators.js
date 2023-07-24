import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';




export const fetchContacts = createAsyncThunk('contact/get', async (_, thunkAPI) => {
    
  try {
    const response = await axios.get('/contacts');
    console.log('fetch-contacts-operation', response.data)
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error fetching contact');
  }
});

export const addContact = createAsyncThunk('contact/post', async (data, thunkAPI) => {
  
  try {
    const response = await axios.post('/contacts', data);
    console.log('add-contact-operation', response.data)
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error adding contact');
  }
});

export const deleteContact = createAsyncThunk('contact/delete', async (contactId, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${contactId}`);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Error deleting contact');
  }
});
