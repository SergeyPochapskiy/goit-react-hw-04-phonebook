import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { ContactForm } from './ContactForm/ContactForm';
import { Wrap } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return (
      contacts ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    return () => {
      localStorage.removeItem('contacts');
    };
  }, []);

  function addContact({ name, number }) {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts([newContact, ...contacts]);
  }

  const filterContact = e => {
    setFilter(e.currentTarget.value);
  };

  const onFilteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const filteredContacts = onFilteredContacts();

  const onDeleteContact = id => {
    return setContacts(contacts.filter(contact => contact.id !== id));
  };

  

return (
    <Wrap>
      <Section title={`Phonebook`}></Section>
      <ContactForm onSubmit={addContact} />
      <Section title={`Contacts`}>
        <Filter filter={filter} filterContact={filterContact} />
        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={onDeleteContact}
        />
      </Section>
    </Wrap>
  );
}