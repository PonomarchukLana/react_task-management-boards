import React, { FC, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import debounce from 'lodash/debounce';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getTaskList, updateTask } from '../../store/tasks/tasksSlice';
import { Column } from '../../components/Column/Column';
import { ColumnOrderEnum, DataType, PayloadType } from '../../types/Types';
import { onDragEnd } from '../../utils/onDragUtils';
import { Container } from '../../components/Container/Styles';
import { Search } from '../../components/Search/Search';
import { Section } from './Styles';

export const TaskManeger: FC = () => {
  const dispatch = useAppDispatch();
  const tasksData: DataType = useAppSelector(state => state.tasksSlice.data);

  useEffect(() => {
    dispatch(getTaskList());
  }, []);

  const handleUpdate = (id: string, status: string, index: number) => {
    dispatch(updateTask({ id, status, index }));
  };

  const handleDebounced = debounce((inputValue) => {
    dispatch(getTaskList(inputValue));
  }, 300);

  const handleOnSearch = (value: string) => {
    handleDebounced(value);
  };

  return (
    <Section>
      <Search
        placeholder='Enter a board id here'
        onSearch={handleOnSearch}
      />

      <Container>
        <DragDropContext onDragEnd={onDragEnd({ tasksData, handleUpdate })}>
          {
            tasksData.columnOrder.map((columnId: ColumnOrderEnum) => {
              const column = tasksData.columns[columnId];

              const tasks: PayloadType[] =
                column.taskIds.map((taskId: string) =>
                tasksData.tasks[taskId]);

              return <Column key={column.id} column={column} tasks={tasks} />;
            })
          }
        </DragDropContext>
      </Container>
    </ Section>
  );
};
