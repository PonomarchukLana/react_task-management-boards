import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from '../store/tasks/tasksSlice';

const store = configureStore({
  reducer: {
    tasksSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
