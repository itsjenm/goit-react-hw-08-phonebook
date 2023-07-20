
// function that filters contacts 
export default function filterFunction(contacts, filter) {
  if (!Array.isArray(contacts)) {
    return []; // Return an empty array if contacts is not an array or is undefined
  }
  const filterText = filter.toLowerCase();

    return contacts.filter(contact => {
      const contactName = contact.name.toLowerCase();
      return contactName.includes(filterText);
    });
  }