import * as React from 'react';

import {BoardMetaData, boardCategories} from '../../customTypings/types';

import './BoardList.scss';
import * as rawData from '../../../static/data.json';

const BoardList = ({type, title, icon, items, toggleStar}: 
  {type: string, title: string, icon: string, items: BoardMetaData[], toggleStar(id: number): void}) => {

  if (items.length == 0 && type !== 'personal') {
    return (<div></div>);
  }

  return (
    <div className="board-list">
      <div className="board-list-title">
        <span className="board-list-icon"><i className={icon}></i></span>
        <span className="board-list-headline">{title}</span>
      </div>
      <ul className="board-list-content clearfix">
        {items.map((board) => (
          <li className="board" style={{backgroundColor: board.background.value}} key={board.id}>
            <div className="background-mask">
              <div className="board-title">{board.title}</div>
              <div className="board-star">
                <i
                  className={board.starred ? 'far fa-star starred' : 'far fa-star'}
                  onClick={() => toggleStar(board.id)}
                ></i>
              </div>
            </div>
          </li>
        ))}
        {type === 'personal' ? 
          <li className="board create-new">
            <div className="background-mask new-mask">
              <div className="create-new-text">Create New Board</div>
            </div>
          </li> : ''
        }
      </ul>
    </div>
  );
}

export const BoardLists = () => {
  const {personal, recent, starred}: 
    {personal: BoardMetaData[], recent: number[], starred: number[]} = rawData;

  const [personalBoards, setPersonalBoards] = React.useState(personal);
  const [recentBoards, setRecentBoards] = React.useState(
    personal.filter((b: BoardMetaData) => recent.includes(b.id))
  );
  const [starredBoards, setStarredBoards] = React.useState(
    personal.filter((b: BoardMetaData) => starred.includes(b.id))
  );

  const icons = {
    [boardCategories.Personal] : 'far fa-user',
    [boardCategories.Recent]: 'far fa-clock',
    [boardCategories.Starred]: 'far fa-star'
  };
  const titles = {
    [boardCategories.Personal] : 'Personal Boards',
    [boardCategories.Recent]: 'Recently Viewed',
    [boardCategories.Starred]: 'Starred Boards'
  }

  const toggleStar = (id: number) => {
    // set board.starred to true
    const board = personal.find((b: BoardMetaData) => b.id === id);
    board.starred = !board.starred;

    if (starred.includes(id)) {
      // remove id from starred array
      const index = starred.indexOf(id);
      starred.splice(index, 1);
    } else {
      starred.push(id);
    }

    setStarredBoards(
      personalBoards.filter(
        (b: BoardMetaData) => starred.includes(b.id)
      )
    );
  }

  return (
    <div className='board-list-pane'>
      <BoardList
        type={boardCategories.Starred}
        title={titles[boardCategories.Starred]}
        icon={icons[boardCategories.Starred]}
        items={starredBoards}
        toggleStar={toggleStar}
      />
      <BoardList 
        type={boardCategories.Recent}
        title={titles[boardCategories.Recent]}
        icon={icons[boardCategories.Recent]}
        items={recentBoards}
        toggleStar={toggleStar}
      />
      <BoardList
        type={boardCategories.Personal}
        title={titles[boardCategories.Personal]}
        icon={icons[boardCategories.Personal]}
        items={personalBoards}
        toggleStar={toggleStar}
      />
    </div>
  )
}