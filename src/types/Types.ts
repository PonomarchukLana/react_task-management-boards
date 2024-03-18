export enum ColumnOrderEnum {
  TODO = 'todo',
  IN_PROGRESS = 'inProgress',
  DONE = 'done'
}

export type PayloadType = {
  description: string;
  id: string;
  index: number;
  status: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type TasksType = {
  [key in string]: PayloadType;
};

export type ColumnObjType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type ColomnType = {
  [key in ColumnOrderEnum]: ColumnObjType;
};

export type DataType = {
  tasks: TasksType;
  columns: ColomnType;
  columnOrder: ColumnOrderEnum[],
};
