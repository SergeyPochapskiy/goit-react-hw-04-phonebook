import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { ContactForm } from './ContactForm/ContactForm';
import { Wrap } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const conatcts = localStorage.getItem(`contacts`);
    const parsedConatcts = JSON.parse(conatcts);
    
    if (parsedConatcts) {
      this.setState({ contacts: parsedConatcts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem(`contacts`, JSON.stringify(contacts));
    }
  }

   addContact = ({ name, number }) => {
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return
    }
    const contact = {
      id: nanoid(5),
      name,
      number,
    }
    this.setState(({contacts}) => ({
      contacts: [contact, ...contacts],
    }));    
  }

  onDeleteContact = id => {
    return this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filterContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onFiltredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    return (
      <Wrap>
        <Section title={`Phonebook`}></Section>
        <ContactForm onSubmit={this.addContact} />
        <Section title={`Contacts`}>
          <Filter filter={this.filter} filterContact={this.filterContact} />
          <ContactsList
            contacts={this.onFiltredContacts()}
            onDeleteContact={this.onDeleteContact}
          />
        </Section>
      </Wrap>
    );
  }
}
