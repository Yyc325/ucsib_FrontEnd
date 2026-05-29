// IBaseTable
export type sizeType = 'large' | 'default' | 'small'

// TableColumn
export enum ColumnTypeEnum {
  DEFAULT = '',
  SELECTION = 'selection',
  INDEX = 'index',
  EXPAND = 'expand',
  EDIT = 'edit'
}

export type ColumnType =
  | ColumnTypeEnum.DEFAULT
  | ColumnTypeEnum.SELECTION
  | ColumnTypeEnum.INDEX
  | ColumnTypeEnum.EXPAND
  | ColumnTypeEnum.EDIT

export type FixedType = 'left' | 'right' | ''

export type SortType = true | false | 'custom'

export type AlignType = 'flex-start' | 'center' | 'flex-end'

export interface Command {
  handleCommand: string
  params?: any
}
