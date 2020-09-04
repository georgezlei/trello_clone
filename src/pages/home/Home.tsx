import * as React from 'react';

import {NavBar} from '../../components/NavBar';
import SideBar from './SideBar';
import { BoardLists } from './BoardList';

import './Home.scss';

export const Home = () => {
  return (
    <>
      <NavBar />
      <div className='body'>
        <SideBar />
        <BoardLists />
      </div>
    </>
  )
}