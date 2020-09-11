import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { BoardMetaData } from '../../customTypings/types';
import NavBar from '../../components/NavBar';

import './Board.scss';

enum ListStatus {
  void,
  creating,
  created
}

const List = () => {
  const [status, setStatus] = React.useState(ListStatus.void);

  const createList = (title: string) => {
    setStatus(ListStatus.created);
  }

  return (
    <div className='board-list'>
      { status === ListStatus.void ?
        <button onClick={()=>{setStatus(ListStatus.creating)}}>
          + Add new list
        </button>
      : status === ListStatus.creating ?
        <div className='list-container'>
          <input type='text' placeholder='Enter list title...' autoFocus />
          <div className='list-creator-actions'>
            <button onClick={()=>createList('')}>Add List</button>
            <button className='list-creator-cancel' onClick={()=>{setStatus(ListStatus.void)}}>
              <i className='fas fa-times' />
            </button>
          </div>
        </div>
      : 
        <div className='list-container'>
          <div className='list-title'>
            <h2>Title</h2>
            <i className='fas fa-ellipsis-h' />
          </div>
          <div className='list-action'>
            + Add new card
          </div>
        </div>
      }
    </div>
  )
}

const Board = () => {
  const location = useLocation();
  const board: BoardMetaData = location.state as BoardMetaData;
  const bgStyle = (b: BoardMetaData) => (b.background.type === 'color' ?
              {backgroundColor: b.background.value} :
              {backgroundImage: `url(${b.background.value})`});
  return (
    <div className='board-detail' style={bgStyle(board)}>
      <NavBar />
      <div className='body'>

        <div className='toolbar'>
          <div className='group-left'>
            <h1>Title</h1>
            <button><i className='far fa-star' /></button>
            <div className='button-divider'></div>
            <button>Personal</button>
            <div className='button-divider'></div>
            <button>Private</button>
            <div className='button-divider'></div>
            <button className='user'>GL</button>
            <button>Invite</button>
          </div>

          <div className='group-right'>
            <button>
              <i className='fas fa-concierge-bell' />
              <span>Butler</span>
            </button>
            <button>
              <i className='fas fa-ellipsis-h' />
              <span>Show Menu</span>
            </button>
          </div>
        </div>

        <div className='board-canvas'>
          <List />
        </div>
      </div>
    </div>
  )
}

export default Board;