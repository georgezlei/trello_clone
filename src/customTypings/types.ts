export interface BoardMetaData {
  id: number,
  title: string,
  background: {
    type: string,
    value: string
  },
  starred: boolean
}

export enum boardCategories {
  Personal = 'personal',
  Recent = 'recent',
  Starred = 'starred'
}