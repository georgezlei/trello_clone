import * as React from 'react';
import {Link} from 'react-router-dom';

import {BoardType, boardCategories} from '../../customTypings/types';
import NewBoard from './NewBoard';

import './BoardList.scss';
import * as rawData from '../../../static/data.json';
import { TrelloContext } from '../../context';


const BoardList = ({type, title, icon, items, toggleStarCallback, createBoardCallback}: 
                    {type: string,
                    title: string,
                    icon: string,
                    items: BoardType[],
                    toggleStarCallback(id: number): void,
                    createBoardCallback?(board: BoardType): void
                  }) => {

  const [popupVisible, setPopupVisible] = React.useState(false);

  if (items.length == 0 && type !== 'personal') {
    return (<div></div>);
  }

  const bgStyle = (b: BoardType) => (b.background.type === 'color' ?
              {backgroundColor: b.background.value} :
              {backgroundImage: `url(${b.background.value})`});

  return (
    <div className="board-list">
      <div className="board-list-title">
        <span className="board-list-icon"><i className={icon}></i></span>
        <span className="board-list-headline">{title}</span>
      </div>
      <ul className="board-list-content clearfix">
        {items.map((board) => (
          <li className="board" style={bgStyle(board)} key={board.id}>
            <Link to={{pathname: `/board`, state: board}}>
              <div className="background-mask">
                <div className="board-title">{board.title}</div>
                <div className="board-star">
                  <i
                    className={board.starred ? 'far fa-star starred' : 'far fa-star'}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleStarCallback(board.id)
                    }}
                  ></i>
                </div>
              </div>
            </Link>
          </li>
        ))}
        {type === boardCategories.Personal ? 
          // Create new board button
          <li className="board create-new">
            <div className="background-mask new-mask" onClick={()=>{setPopupVisible(true)}}>
              <div className="create-new-text">Create New Board</div>
            </div>
            {popupVisible ? 
              <NewBoard
                createBoardCallback={createBoardCallback}
                onClick={()=>{setPopupVisible(false)}}
              /> : ''
            }
          </li> : ''
        }
      </ul>
    </div>
  );
}



export const BoardLists = () => {
  const {personal, recent, starred}: 
    {personal: BoardType[], recent: number[], starred: number[]} = React.useContext(TrelloContext);

  const [personalBoards, setPersonalBoards] = React.useState(personal);
  const [recentBoards, setRecentBoards] = React.useState(
    personal.filter((b: BoardType) => recent.includes(b.id))
  );
  const [starredBoards, setStarredBoards] = React.useState(
    personal.filter((b: BoardType) => starred.includes(b.id))
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
    const board = personalBoards.find((b: BoardType) => b.id === id);
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
        (b: BoardType) => starred.includes(b.id)
      )
    );
  }

  const createBoard = (board: BoardType) => {
    personalBoards.push(board);
    setPersonalBoards(personalBoards);
  }

  return (
    <div className='board-list-pane'>
      <BoardList
        type={boardCategories.Starred}
        title={titles[boardCategories.Starred]}
        icon={icons[boardCategories.Starred]}
        items={starredBoards}
        toggleStarCallback={toggleStar}
      />
      <BoardList 
        type={boardCategories.Recent}
        title={titles[boardCategories.Recent]}
        icon={icons[boardCategories.Recent]}
        items={recentBoards}
        toggleStarCallback={toggleStar}
      />
      <BoardList
        type={boardCategories.Personal}
        title={titles[boardCategories.Personal]}
        icon={icons[boardCategories.Personal]}
        items={personalBoards}
        toggleStarCallback={toggleStar}
        createBoardCallback={createBoard}
      />
    </div>
  )
}