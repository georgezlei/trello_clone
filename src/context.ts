import * as React from 'react';

export const TrelloContext = React.createContext({
  personal: [],
  recent: [],
  starred: []
})