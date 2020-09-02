import * as React from 'react';
import {NavBar} from '../../components/NavBar';
import { BoardLists } from './BoardList';

export const Home = () => {
  return (
    <>
      <NavBar></NavBar>
      <BoardLists />
    </>
  )
}