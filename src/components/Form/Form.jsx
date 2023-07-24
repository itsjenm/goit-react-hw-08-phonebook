import { Button, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useAddContactMutation, useGetContactsQuery } from 'redux/Contacts/contactsApi';
import { getContacts } from 'redux/Contacts/selectors';
import { addContact, fetchContacts } from 'redux/Contacts/operators';

// form that handles adding contacts to  the phonebook

const Form = () => {
  const contacts = useSelector(getContacts);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();

  // 2. Replace the fetchContacts action with the useGetContactsQuery hook
  // const { data: fetchedContacts } = useGetContactsQuery();
  // Replace the postContacts action with the useAddContactMutation hook
  // const addContactMutation = useAddContactMutation();

  // function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (
        contacts.some(
          contact =>
            contact.name.toLowerCase() === formData.name.toLocaleLowerCase()
        )
      ) {
        return alert(`${formData.name} exists in your phonebook.`);
      }
      dispatch(addContact(formData));
      alert(`${formData.name} has been added to your phonebook.`);
      setFormData({
        name: '',
        number: '',
      });
      console.log(contacts)
    } catch (error) {
      alert('Error adding contact. Please try again');
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
      <Button variant="contained" type="submit"  sx={{ padding: '15px' }}>
        Add Contact
      </Button>
    </form>
  );
};

export default Form;
