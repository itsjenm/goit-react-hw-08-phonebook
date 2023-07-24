import { Button, TextField } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useAddContactMutation, useGetContactsQuery } from 'redux/Contacts/contactsApi';
import { getContacts } from 'redux/Contacts/selectors';
import { addContact, fetchContacts } from 'redux/Contacts/operators';

// form that handles adding contacts to  the phonebook

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

 

  // 2. Replace the fetchContacts action with the useGetContactsQuery hook
  // const { data: fetchedContacts } = useGetContactsQuery();
// Replace the postContacts action with the useAddContactMutation hook
  // const addContactMutation = useAddContactMutation();

  // function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

   
    const isContactExist = contacts.some(
      contact => contact.name === formData.name.toLowerCase()
    );

    const isNumberExist = contacts.some(
      contact => contact.number === formData.number
    );

    if (isContactExist) {
        alert(`${formData.name} is already in the contact list`);
        return
    } else if (isNumberExist) {
        alert(`${formData.number} is already in the contact list`);
        return
    }

    
    try {
      await dispatch(addContact(formData)).then(() => {
        dispatch(fetchContacts())
        console.log("Contact added successfully");
        console.log(contacts)
      });
      setFormData({
        name: '',
        number: '',
      });
    } catch (error) {
      alert('Error adding contact. Please try again.');
    }

    
    
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: 40 }}>
      <TextField
        type="text"
        name="name"
        label="Contact Name"
        value={formData.name}
        onChange={e =>
          setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        required
      />
      <TextField
        type="tel"
        name="number"
        label="Phone Number"
        value={formData.number}
        onChange={e =>
          setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        required
      />
      <Button variant="contained" type='submit'>Add Contact</Button>
      
    </form>
  );
};

export default Form;
