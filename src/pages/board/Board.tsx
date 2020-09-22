import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { BoardType, ListType, CardType } from '../../customTypings/types';
import NavBar from '../../components/NavBar';

import './Board.scss';
import { BoardLists } from '../home/BoardList';

enum ListStatus {
  void,
  creating,
  created
}

interface BoardCallbacks {
  addList?: (title: string) => void;
}

// Component: Card

const Card = ({card, index, onDragOver, deleteCard}:
    {card?: CardType, index: number, onDragOver?(): void, deleteCard?(): void}) => {
  const [dropTargetShown, showDropTarget] = React.useState(false);

  const onDragStart = (e: React.DragEvent) => {
    deleteCard();
    e.dataTransfer.setData('card', JSON.stringify(card));
  }

  const onDragEnd = () => {
    // if (not)
  }
  if (card) {
    return (
      <div className='card-container'>
        <div className='space-filler' />
        <div className='card'
          draggable='true'
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          // onDrop={()=>{console.log('drop')}}
        >
          <span>{card.title}</span>
          <i className='far fa-edit' />
        </div>
      </div>);
  } else {
    return (
      <div className='card-container'>
        <div className='space-filler' />
        <div className='card place-holder' />
      </div>);
  }
}

// Component: List Title

const ListTitle = ({list}: {list: ListType}) => {
  const [title, setTitle] = React.useState(list ? list.title : '');
  const [titleInEdit, setTitleInEdit] = React.useState(false);

  const updateTitle = (title: string) => {
    list.title = title;
    setTitle(title);
  }

  return (
    <div className='list-title'>
      {
        titleInEdit ?
          <input
            type='text'
            value={ title }
            onChange={ e => updateTitle(e.target.value) }
            onKeyPress={ e => (e.key === 'Enter') && setTitleInEdit(false) }
            onBlur={ () => setTitleInEdit(false) }
            autoFocus
          />
        :
          <h2 onClick={ () => setTitleInEdit(true) }>{title}</h2>
      }
      <i className='fas fa-ellipsis-h' />
    </div>
  )
}

// Component: List Action

const ListAction = ({addCard}: {addCard(title: string): void}) => {
  const [isAddingCard, showAddingCard] = React.useState(false);
  const [newCardTitle, setNewCardTitle] = React.useState('');

  const abortNewCard = () => {
    showAddingCard(false);
    setNewCardTitle('');
  }

  const add = (title: string) => {
    showAddingCard(false);
    setNewCardTitle('');
    addCard(title);
  }

  if (isAddingCard) {
    return (
      <div className='new-card'>
        <textarea
          className='card'
          placeholder='Enter a title for this card...'
          value={ newCardTitle }
          onChange={ e => setNewCardTitle(e.target.value) }
          onKeyPress={ e => (e.key === 'Enter') && add(newCardTitle) }
          autoFocus
        ></textarea>
        <button onClick={ () => add(newCardTitle) }>
          Add Card
        </button>
        <button className='cancel' onClick={ () => abortNewCard() }>
          <i className='fas fa-times' />
        </button>
      </div>
    )
  } else {
    return (
      <div className='list-action' onClick={ () => showAddingCard(true) }>
        + Add new card
      </div>
    )
  }
}

// Component: New List Button

const NewListButton = ({addList}: {addList(title: string): void}) => {
  const [creating, setStatus] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const createList = (title: string) => {
    addList(title);
    setStatus(false);
    setTitle('');
  }

  if (creating) {
    return (
      <div className='list-container'>
        <input
          type='text'
          placeholder='Enter list title...'
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyPress={e => (e.key === 'Enter') && createList(title)}
          autoFocus
        />
        <div className='list-creator-actions'>
          <button onClick={() => createList(title)}>Add List</button>
          <button className='cancel' onClick={ () => setStatus(false) }>
            <i className='fas fa-times' />
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <button onClick={ ()=> setStatus(true) }>
        + Add new list
      </button>
    )
  }
}

// Component: List

const List = ({list, callbacks}: {list?: ListType, callbacks: BoardCallbacks}) => {
  const [cards, setCards] = React.useState(list ? list.cards : []);
  const [dropPosition, setDropPosition] = React.useState(-1);

  const addNewCard = (title: string) => {
    const newCard: CardType = {
      title: title,
      description: '',
      comments: []
    };
    setCards([...cards, newCard]);
    list.cards.push(newCard);
  }

  const hideDropTarget = (e: React.DragEvent<HTMLDivElement>) => {
    // Only process the events fired by .list-container
    const div: HTMLDivElement = e.target as HTMLDivElement;
    if (div.classList.contains('list-container')) {
      setDropPosition(-1);
    }
  } 

  const deleteCard = (index: number) => {
    cards.splice(index, 1);
  }

  const onDrop = (e: React.DragEvent) => {
    if (dropPosition >= 0) {
      const data = e.dataTransfer.getData('card');
      const card = JSON.parse(data);
      cards.splice(dropPosition, 0, card);
      setDropPosition(-1);
    }
  }

  return (
    <div
      className='list-container'
      draggable='true'
      onDragLeave={ hideDropTarget }
      onDrop={ onDrop }
      onDragOver={ e => e.preventDefault() }
    >
      <ListTitle list={list} />

      {
        cards.map((card, index) => (
          <React.Fragment key={ index }>
            {
              index === dropPosition ? 
                <Card index={ index } key={ index + 't' } />
              :
                ''
            }
            <Card
              card={ card }
              index={ index }
              onDragOver={ () => {setDropPosition(dropPosition === index ? index + 1 : index)} }
              deleteCard={ () => deleteCard(index) }
              key={ index }
            />
          </React.Fragment>
        ))
      }
      {
        cards.length === dropPosition ? 
          <Card index={cards.length} key={cards.length + 't'} />
        :
          ''
      }

      <ListAction addCard={ addNewCard } />
    </div>
  )
}


// Component: Board

const Board = () => {
  const location = useLocation();
  const board: BoardType = location.state as BoardType;
  const bgStyle = (b: BoardType) => (b.background.type === 'color' ?
              {backgroundColor: b.background.value} :
              {backgroundImage: `url(${b.background.value})`});

  const [title, setTitle] = React.useState(board.title);
  const [star, setStar] = React.useState(board.starred);
  const [lists, setLists] = React.useState(board.lists);
  
  const moveCard = (list: number, card: number, toList: number, toPosition: number) => {}
  const moveList = (list: number, toPosition: number) => {}

  const addCard = (list: number, title: string) => {}
  const addList = (title: string) => {
    const newList: ListType = {
      title,
      cards: []
    };
    setLists([...lists, newList]);
    board.lists.push(newList);
  }

  const addComment = (list: number, card: number, text: string) => {}
  const deleteCard = (list: number, card: number) => {}
  const deleteList = (list: number) => {}
  const deleteComment = (list: number, card: number) => {}
  const updateCard = (list: number, card: number, title: string) => {}
  const updateComment = (list: number, card: number, comment: number) => {}

  return (
    <div className='board-detail' style={bgStyle(board)}>
      <NavBar />
      <div className='body'>

        {/* toolbar */}
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
        <div className='toolbar-placeholder'></div>

        {/* Canvas */}
        <div className='board-canvas'>
          {
            lists.map((l, index) => (
              <List
                list={l}
                callbacks={{
                }}
                key={index}
              />
            ))
          }
          <NewListButton addList={ addList }/>
        </div>
      </div>
    </div>
  )
}

export default Board;