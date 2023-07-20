import { Button, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddContactMutation, useGetContactsQuery } from 'redux/Contacts/contactsApi';
import { getContacts } from 'redux/Contacts/selectors';

// form that handles adding contacts to  the phonebook

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  // 2. Replace the fetchContacts action with the useGetContactsQuery hook
  const { data: fetchedContacts } = useGetContactsQuery();
// Replace the postContacts action with the useAddContactMutation hook
  const addContactMutation = useAddContactMutation();

  // function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    if (formData.name === '' || formData.number === '') {
      return;
    }

    const isContactExist = contacts.some(
      contact => contact.name === formData.name
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

    // dispatch(postContacts(formData)).then(() => {
    //   dispatch(fetchContacts());
    // });
    
    addContactMutation.mutate(formData, {
      onSuccess: () => {
        // Refetch the contacts after adding a new contact
        fetchedContacts.refetch();
      },
    });

    setFormData({
      name: '',
      number: '',
    });
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
      <Button variant="contained">Add Contact</Button>
    </form>
  );
};

export default Form;
