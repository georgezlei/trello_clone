import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { BoardType, ListType, CardType } from '../../customTypings/types';
import NavBar from '../../components/NavBar';
import Card from './Card';

import './Board.scss';
import { BoardLists } from '../home/BoardList';


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

const List = ({list, dropPosition, onDragStart, onDragCardStart, onDragOver}: {
      list: ListType,
      dropPosition: number,
      onDragStart(): void,
      onDragCardStart(card: number): void,
      onDragOver(card: number): void
    }) => {

  // cards state is not used in component, this is only a trick to force re-rendering
  const [cards, setCards] = React.useState(list.cards.length);

  const addNewCard = (title: string) => {
    const newCard: CardType = {
      id: Date.now(),
      title: title,
      description: '',
      comments: []
    };
    setCards(cards + 1);
    list.cards.push(newCard);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver(list.cards.length);
  }

  return (
    <div
      className='list-container'
      draggable='true'
      onDragOver={ handleDragOver }
    >
      <ListTitle list={list} />

      {
        list.cards.map((card, index) => (
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
              onDragOver={ () => { onDragOver(index) } }
              onDragStart={ () => { onDragCardStart(index) } }
              key={ card.id }
            />
          </React.Fragment>
        ))
      }
      {
        list.cards.length === dropPosition ? 
          <Card index={list.cards.length} key={list.cards.length + 't'} />
        :
          ''
      }

      <ListAction addCard={ addNewCard } />
    </div>
  )
}

const BoardTitle = ({board}: {board: BoardType}) => {

  const [title, setTitle] = React.useState(board.title);
  const [inEdit, edit] = React.useState(false);

  const updateTitle = (newTitle: string) => {
    board.title = newTitle;
    setTitle(newTitle);
  }

  return (
    <div className='board-title'>
        <h1 onClick={ ()=>edit(true) }>{ title }</h1>
        { inEdit ?
          <input
            type='text'
            placeholder='Enter board title...'
            value={ title }
            onChange={ e => updateTitle(e.target.value) }
            onKeyPress={ e => (e.key == 'Enter') && edit(false) }
            onBlur={ e => edit(false) }
            autoFocus
          /> : ''
        }
    </div>
  )
}

// Component: Board Tool Bar

const BoardToolBar = ({board}: {board: BoardType}) => {

  const [starred, setStarred] = React.useState(board.starred);

  const handleStarClick = () => {
    board.starred = !starred;
    setStarred(!starred);
  }

  return (
    <div className='toolbar'>
      <div className='group-left'>
        <BoardTitle board={ board } />
        <button onClick={ handleStarClick }>{
          starred ? <i className='far fa-star starred' /> : <i className='far fa-star' />
        }</button>
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
  )
}


// Component: Board

const Board = () => {
  const location = useLocation();
  const board: BoardType = location.state as BoardType;
  const bgStyle = (b: BoardType) => (b.background.type === 'color' ?
              {backgroundColor: b.background.value} :
              {backgroundImage: `url(${b.background.value})`});

  const [lists, setLists] = React.useState(board.lists);
  const [dropLocation, setDropLocation] = React.useState([-1, -1]);
  const cardInDragging = React.useRef([-1, -1]);
  
  let listInDragging: ListType = null;

  const handleDraggingListStart = (list: ListType) => {
    listInDragging = list;
  }
  
  const handleDraggingCardStart = (list: number, card: number) => {
    cardInDragging.current = [list, card];
  }

  const reportDragOver = (list: number, card: number) => {
    // move the card if it is not in the new location
    const [fromList, fromCard] = cardInDragging.current;

    if (fromList !== list || 
      (fromCard !== card && 
        !(fromCard < card && fromCard === lists[list].cards.length - 1) // ignore the repeat requests to move the card to end of list
      )
    ) {
      const theCard = lists[fromList].cards[fromCard];
      const newLists = lists.map((l, index) => {

        // if current list is neither from-list nor to-list, don't process it.
        if (index !== fromList && index !== list) {
          return l;
        }

        let cards: CardType[] = l.cards;

        // remove the dragging card from from-list
        if (index === fromList) {
          cards = [...cards.slice(0, fromCard), ...cards.slice(fromCard + 1)];
        }

        // add the dragging card into to-list
        if (index === list) {
          if (card > cards.length) {
            card = cards.length;
          }
          cards = [...cards.slice(0, card), theCard, ...cards.slice(card)]
        }

        return { title: l.title, cards };
      });
      cardInDragging.current = [list, card];
      setLists(newLists);
    }
  }

  const handleDrop = () => {
    cardInDragging.current = [-1, -1];
  }
  
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

        <BoardToolBar board={ board } />
        <div className='toolbar-placeholder'></div>

        {/* Canvas */}
        <div
          className='board-canvas'
          onDrop={ handleDrop }
          tabIndex={0}
        >
          {
            lists.map((l, index) => (
              <List
                list={ l }
                dropPosition={dropLocation[0] === index ? dropLocation[1] : -1}
                onDragStart={ () => handleDraggingListStart(l) }
                onDragCardStart={ (card) => handleDraggingCardStart(index, card) }
                onDragOver={ (card) => reportDragOver(index, card) }
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