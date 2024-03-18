import { DataType } from '../../types/Types';

interface initialState {
  status: 'idle' | 'fulfilled' | 'loading',
  data: DataType;
}

export const initialState = {
  status: 'idle',
  data: {
    tasks: {},
    columns: {
      'todo': {
        id: 'todo',
        title: 'To do',
        taskIds: [],
      },
      'inProgress': {
        id: 'inProgress',
        title: 'In Progress',
        taskIds: [],
      },
      'done': {
        id: 'done',
        title: 'Done',
        taskIds: [],
      },
    },
    columnOrder: ['todo', 'inProgress', 'done'],
  }
} as initialState;
