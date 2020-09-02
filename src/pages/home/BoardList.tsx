import * as React from 'react';
import {TrelloContext} from '../../context';
import './BoardList.scss';

const BoardList = ({type}: {type: string}) => {
  const {personal, recent, starred} = React.useContext(TrelloContext);
  // make a list and assign to state
  const displayTitle = type === 'personal' ? 'Personal Boards' :
                       type === 'recent' ? 'Recently Viewed' :
                       type === 'starred' ? 'Starred Boards' :
                       '';
  const displayIcon = type === 'personal' ? 'far fa-user' :
                      type === 'recent' ? 'far fa-clock' :
                      type === 'starred' ? 'far fa-star' :
                      '';
  const displayList = type === 'personal' ? personal :
                      type === 'recent' ? personal.filter((elem) => recent.includes(elem.id)) :
                      type === 'starred' ? personal.filter((elem) => starred.includes(elem.id)) :
                      [];
  if (displayList.length == 0) {
    return (<div></div>);
  }

  return (
    <div className="board-list">
      <div className="board-list-title">
        <span className="board-list-icon"><i className={displayIcon}></i></span>
        <span className="board-list-headline">{displayTitle}</span>
      </div>
      <ul className="board-list-content clearfix">
        {displayList.map((board) => (
          <li className="board" style={{backgroundColor: board.background.value}} key={board.id}>
            <div className="background-mask">
              <div className="board-title">{board.title}</div>
              <div className="board-star"><i className={board.starred ? 'far fa-star starred' : 'far fa-star'}></i></div>
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
  return (
    <>
      <BoardList type='starred'></BoardList>
      <BoardList type='recent'></BoardList>
      <BoardList type='personal'></BoardList>
    </>
  )
}