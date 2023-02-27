import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
// import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyele';
import { Layout } from './Layout';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+380934591256' },
      { id: 'id-2', name: 'Hermione Kline', number: '+380934438912' },
      { id: 'id-3', name: 'Eden Clements', number: '+380936451779' },
      { id: 'id-4', name: 'Annie Copeland', number: '+380932279126' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const { contacts } = this.state;

    const check = contacts.find(
      con => con.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (check) {
      return alert(`${newContact.name}: is already in contacts`);
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
    return true;
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  componentDidMount() {
    console.log('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    this.setState({ contacts: parseContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');
  }

  render() {
    console.log('App render');
    const { contacts, filter } = this.state;

    const normalizeFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );

    return (
      <Layout>
        <GlobalStyle />
        <h1>Phonebook</h1>
        <ContactForm onSave={this.addContact} onCheck={this.checkContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.changeFilter} />
        <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
      </Layout>
    );
  }
}
