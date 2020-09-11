import * as React from 'react';

import NavBar from '../../components/NavBar';
import SideBar from './SideBar';
import { BoardLists } from './BoardList';

import './Home.scss';

export const Home = () => {
  return (
    <div className='home'>
      <NavBar />
      <div className='body'>
        <SideBar />
        <BoardLists />
      </div>
    </div>
  )
}