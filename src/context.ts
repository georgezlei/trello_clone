import * as React from 'react';
import * as rawData from '../static/data.json';

const { personal, starred, recent } = rawData;

export const defaultContext = {
  user: {
    name: 'GL',
    avatar: ''
  },
  personal,
  recent,
  starred,
  toggleStar: function (id: number) {
    //
  },
  addRecent: (id: number) => {},
  createBoard: (title: string, background: {type: string, value: string}) => {},
};

export const TrelloContext = React.createContext(defaultContext);