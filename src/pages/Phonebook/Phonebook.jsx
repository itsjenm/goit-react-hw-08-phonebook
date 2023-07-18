import { TextField, Card, ListItem, ListItemText, Button } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/Contacts/selectors';
import Form from 'components/Form/Form';
import { changeFilter } from 'redux/Contacts/slice';
import filterFunction from 'utils/filter';
import { useEffect } from 'react';
import { deleteContacts, fetchContacts } from 'redux/Contacts/operators';

// page that shows up when user is logged In

const Phonebook = () => {
  // grabs the contact items
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  });

  function onDelete(id) {
    dispatch(deleteContacts(id)).then(() => {
        dispatch(fetchContacts());
    });
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
