export interface KanbanCard {
  id: number,
  title: string,
  order: number,
}

export interface KanbanField {
  id: number,
  title: string,
  order: number
  cards: KanbanCard[],
}

export interface KanbanBoard {
  id: number,
  title: string
  fields: KanbanField[],
}