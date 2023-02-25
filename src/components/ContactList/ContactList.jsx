import React from 'react';
import { Button, Description, Item, List } from './ContactList.styled';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <Item key={id}>
          <Description>
            {name}: {number}
          </Description>
          <Button type="button" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </Item>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
