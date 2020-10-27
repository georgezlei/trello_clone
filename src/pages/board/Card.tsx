import * as React from 'react';
import { CardType } from '../../customTypings/types';

import './Card.scss';

// Component: Card

const Card = ({ card, index, onDragOver, onDragStart }:
  {
    card?: CardType,
    index: number,
    onDragOver?(): void,
    onDragStart?(): void,
  }) => {

  const [titleInEdit, setTitleInEdit] = React.useState(false);
  const [title, setTitle] = React.useState(card.title);
  const [dropTargetShown, showDropTarget] = React.useState(false);

  const updateTitle = (newTitle: string) => {
    card.title = newTitle;
    setTitle(newTitle);
  }

  const startDragging = (e: React.DragEvent) => {
    onDragStart();
  }

  if (card && !dropTargetShown) {
    return (
      <div className='card-container'>
        <div className='space-filler' />
        <div className='card'
          draggable='true'
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDragOver();
          }}
          onDragStart={ startDragging }
          tabIndex={ 1 }
        >
          { titleInEdit ?
            <input
              type='text'
              placeholder='Enter the title...'
              value={ title }
              onChange= { e => updateTitle(e.target.value) }
              onKeyPress={ e => (e.key === 'Enter') && setTitleInEdit(false) }
              onBlur={ e => setTitleInEdit(false) }
              autoFocus
            />
            :
            <div>
              <span>{ title }</span>
              <i className='far fa-edit' onClick={ () => setTitleInEdit(true) } />
            </div>
          }
        </div>
      </div>
    );
  } else {
    return (
      <div className='card-container'>
        <div className='space-filler' />
        <div className='card place-holder' />
      </div>);
  }
}

export default Card;