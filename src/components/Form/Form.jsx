import { Button, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, postContacts } from 'redux/Contacts/operators';
import { getContacts } from 'redux/Contacts/selectors';

// form that handles adding contacts to  the phonebook

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

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

    dispatch(postContacts(formData)).then(() => {
      dispatch(fetchContacts());
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
