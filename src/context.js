import React from 'react';

export const EventContext = React.createContext({
  event: {},
  changeEvent: () => {},
});
