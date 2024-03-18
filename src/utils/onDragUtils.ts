import { DropResult } from 'react-beautiful-dnd';
import { ColumnObjType, ColumnOrderEnum, DataType } from '../types/Types';

type Args = {
  tasksData: DataType;
  handleUpdate: (id: string, status: string, index: number) => void;
}

export const onDragEnd = ({tasksData, handleUpdate}: Args) => {
  return (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = tasksData.columns[source.droppableId as ColumnOrderEnum];
    const finish =
      tasksData.columns[destination.droppableId as ColumnOrderEnum];

    if (start === finish) {
      const column: ColumnObjType =
        tasksData.columns[source.droppableId as ColumnOrderEnum];

      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      handleUpdate(draggableId, destination.droppableId, destination.index);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    handleUpdate(draggableId, destination.droppableId, destination.index);
  };
};