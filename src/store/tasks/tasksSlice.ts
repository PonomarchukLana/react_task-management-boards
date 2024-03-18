import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialState } from './initialState';
import { ColumnOrderEnum, PayloadType } from '../../types/Types';

export const getTaskList = createAsyncThunk('tasksSlice/getTaskList',
  async (id?: string | undefined) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/tasks/${id ? `${id}` : ''}`);
    return response.data;
  }
);

export const addTask = createAsyncThunk('tasksSlice/addTask',
  async ({ title, description }: {
    title: string, description: string
  }) => {
    const body = {
      index: 0,
      title,
      description,
      status: ColumnOrderEnum.TODO,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/tasks`, body);
    return response.data;
  }
);

export const updateTask = createAsyncThunk('tasksSlice/updateTask',
  async ({ id, title, description, status, index }: {
    id: string;
    title?: string;
    description?: string;
    status: string;
    index: number
  }) => {
    const body = {
      title: title,
      description: description,
      status: status,
      index: index,
    };
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/tasks/${id}`, body);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk('tasksSlice/deleteTask',
  async (id: string) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/tasks/${id}`);
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //get
    builder.addCase(getTaskList.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(getTaskList.fulfilled, (state, action) => {
      state.status = 'fulfilled';

      if (action.payload.length) {
        state.data.tasks = Object.fromEntries(
          action.payload.map((data: PayloadType) => {
            const strId = data.id.toString();

            state.data.columnOrder.map((colId: ColumnOrderEnum) => {
              if (!state.data.columns[colId].taskIds.includes(strId)) {
                if (data.status ===
                  state.data.columns[colId].id) {
                  state.data.columns[colId].taskIds
                    .splice(data.index, 0, strId);
                }
              }
            });

            return [data.id, { ...data, id: strId }];
          })
        );
      } else {
        if (action.payload.id) {
          const strId = action.payload.id.toString();

          state.data.columnOrder.map((colId: ColumnOrderEnum) => {
            state.data.columns[colId].taskIds = [];
            
            if (action.payload.status ===
              state.data.columns[colId].id) {
              state.data.columns[colId].taskIds
                .splice(action.payload.index, 0, strId);
            }
          });

          state.data.tasks = {
            [action.payload.id]: {
              ...action.payload,
              id: action.payload.id.toString()
            }
          };
        }
      }
    });

    builder.addCase(getTaskList.rejected, (state) => {
      state.status = 'idle';
    });

    //add
    builder.addCase(addTask.pending, (state) => {
      state.status = 'loading';
    }),

      builder.addCase(addTask.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.columns[ColumnOrderEnum.TODO].taskIds
          .unshift(`${action.payload.id}`);

        state.data.tasks = {
          [action.payload.id]: {
            ...action.payload, id: `${action.payload.id}`
          }, ...state.data.tasks
        };
      }),

      builder.addCase(addTask.rejected, (state) => {
        state.status = 'idle';
      }),


      //update
      builder.addCase(updateTask.pending, (state, action) => {
        state.status = 'loading';

        const strId = action.meta.arg.id.toString();
        state.data.columnOrder.map((colId: ColumnOrderEnum) => {
          if (!state.data.columns[colId].taskIds.includes(strId)) {
            if (action.meta.arg.status ===
              state.data.columns[colId].id) {
              state.data.columns[colId].taskIds
                .splice(action.meta.arg.index, 0, strId);
            }
          } else {
            const index = state.data.columns[colId].taskIds.indexOf(strId);
            state.data.columns[colId].taskIds.splice(index, 1);

            if (action.meta.arg.status ===
              state.data.columns[colId].id) {

              state.data.columns[colId].taskIds
                .splice(action.meta.arg.index, 0, strId);
            }
          }
        });
      });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      const strId = action.payload.id.toString();

      state.data.tasks[strId] = { ...action.payload, id: strId };
    });

    builder.addCase(updateTask.rejected, (state) => {
      state.status = 'idle';
    });

    //delete
    builder.addCase(deleteTask.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      delete state.data.tasks[action.payload.id];

      state.data.columnOrder.map((data: ColumnOrderEnum) => {
        if (state.data.columns[data].taskIds.includes(action.payload.id)) {
          const index = state.data.columns[data].taskIds
            .indexOf(action.payload.id);

          state.data.columns[data].taskIds.splice(index, 1);
        }
      });
    });

    builder.addCase(deleteTask.rejected, (state) => {
      state.status = 'idle';
    });
  },
});

export default tasksSlice.reducer;
