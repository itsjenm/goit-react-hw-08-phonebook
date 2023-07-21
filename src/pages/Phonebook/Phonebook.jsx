import { TextField, Card, ListItem, ListItemText, Button } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/Contacts/selectors';
import Form from 'components/Form/Form';
import { changeFilter } from 'redux/Contacts/slice';
import filterFunction from 'utils/filter';
import { useEffect } from 'react';
import { useGetContactsQuery, useDeleteContactMutation } from 'redux/Contacts/contactsApi';


// page that shows up when user is logged In

const Phonebook = () => {
  // grabs the contact items
  const contacts = useSelector(getContacts) || [];
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const { data, error, isLoading, refetch } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  // useGetContactsQuery hook will automatically handle fetching the contacts data and updating the store. The useEffect block becomes unnecessary for fetching the data, and you can directly use the deleteContact mutation from the useDeleteContactMutation hook to handle contact deletion.
  useEffect(() => {
  
  }, []);

  function onDelete(id) {
    dispatch(deleteContact(id)).unwrap().then(() => {
        refetch();  // Refetch contacts after successful deletion
    }).catch((error) => {
      console.error('Error deleting contact: ', error);
    })
  }

  const filteredContacts = filterFunction(contacts, filter);

  return (
    <div>
      {/* insert form that renders the phonebook  */}
      <Form />
      <TextField
        type="text"
        name="filter"
        label="Filter"
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
      <h3>Contacts</h3>
      <Card>
        {contacts.length > 0 && filteredContacts.map(contact => (
            <div key={contact.id}>
                <ListItem>
                    <ListItemText primary={`${contact.name}: ${contact.phone}`} />
                    <Button variant='contained' color='secondary' onClick={() => onDelete(contact.id)}>
                        Delete
                    </Button>
                </ListItem>
            </div>
        ))}
      </Card>
    </div>
  );
};

export default Phonebook;
