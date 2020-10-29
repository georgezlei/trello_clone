export interface CardType {
  id: number,
  title: string,
  description: string,
  comments: string[]
}

export interface ListType {
  title: string,
  cards: CardType[]
}

export interface BoardType {
  id: number,
  title: string,
  background: {
    type: string,
    value: string
  },
  starred: boolean,
  lists: ListType[]
}

export enum boardCategories {
  Personal = 'personal',
  Recent = 'recent',
  Starred = 'starred'
}