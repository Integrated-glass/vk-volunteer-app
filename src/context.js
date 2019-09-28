import React from 'react';

export const EventContext = React.createContext({
  event: {},
  changeEvent: () => {},
});

export const UserContext = React.createContext({
  user: {},
  changeUser: () => {},
});
