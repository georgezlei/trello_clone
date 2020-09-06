import * as React from 'react';

import {BoardMetaData} from '../../customTypings/types';

import './NewBoard.scss';
import bg1 from '../../../static/bg-1.jpeg';
import bg2 from '../../../static/bg-2.jpeg';
import bg3 from '../../../static/bg-3.jpeg';
import bg4 from '../../../static/bg-4.jpeg';
import bg1Small from '../../../static/bg-1-small.jpeg';
import bg2Small from '../../../static/bg-2-small.jpeg';
import bg3Small from '../../../static/bg-3-small.jpeg';
import bg4Small from '../../../static/bg-4-small.jpeg';

const backgroundList = [
  {
    type: 'image',
    value: bg1Small,
    tip: ''
  },
  {
    type: 'image',
    value: bg2Small,
    tip: ''
  },
  {
    type: 'image',
    value: bg3Small,
    tip: ''
  },
  {
    type: 'image',
    value: bg4Small,
    tip: ''
  },
  {
    type: 'color',
    value: 'rgb(0, 121, 191)',
    tip: 'blue'
  },
  {
    type: 'color',
    value: 'rgb(210, 144, 52)',
    tip: 'orange'
  },
  {
    type: 'color',
    value: 'rgb(81, 152, 57)',
    tip: 'green'
  },
  {
    type: 'color',
    value: 'rgb(176, 70, 50)',
    tip: 'red'
  },
];

interface Background {
  type: string,
  value: string,
  tip: string
}

const NewBoard = ({createBoardCallback, onClick}: 
  {createBoardCallback(board: BoardMetaData): void, onClick(): void}) => {

  const [background, setBackground] = React.useState(backgroundList[0]);
  const [title, setTitle] = React.useState('');

  const dismissPopup = onClick;
  const bgStyle = (bg: Background) => (bg.type === 'color' ?
              {backgroundColor: bg.value} :
              {backgroundImage: `url(${bg.value})`});

  const createBoard = () => {
    if (title === '') return;

    const board: BoardMetaData = {
      id: Date.now(),
      title,
      background: {
        type: background.type,
        value: background.value
      },
      starred: false,
    };
    createBoardCallback(board);
    dismissPopup();
  }

  const onKeyPressInTitleEditor = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' ) {
      createBoard();
    }
  }
  return (
    <div className='new-board-popup' onClick={dismissPopup}>
      <div className='new-board-form' onClick={(e)=>{e.stopPropagation();}}>
        <div className='new-board-demo' style={bgStyle(background)}>
          <input
            type='text'
            className='new-board-title'
            placeholder='Add board title'
            value={title}
            onChange={e=>{setTitle(e.target.value)}}
            onKeyPress={onKeyPressInTitleEditor}
          />
          <button className='new-board-visibility'>
            <i className='fas fa-lock' />
            <span>Private</span>
            <i className='fas fa-chevron-down' />
          </button>
          <button className='close-button' onClick={dismissPopup}>
            <i className='fas fa-times' />
          </button>
        </div>
        <div className='background-selector'>
          <ul>
            {backgroundList.map((bg) => (
              <li key={bg.value}><div style={bgStyle(bg)}></div></li>
            ))}
            <li><div className='more-bg-button'><i className='fas fa-ellipsis-h' /></div></li>
          </ul>
        </div>
        <button className='ok-button' onClick={createBoard}>Create Board</button>
      </div>
    </div>
  )
}

export default NewBoard;