import React, { FC, useState } from 'react';
import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import {
  StrictModeDroppable
} from '../StrictModeDroppable/StrictModeDroppable';
import {ColumnObjType, ColumnOrderEnum, PayloadType } from '../../types/Types';
import { Task } from '../Task/Task';
import AddIcon from '@mui/icons-material/Add';
import { Container, TaskList, Header, Title } from './Styles';
import { IconBtn } from '../IconBtn/IconBtn';
import { ModalAddNew } from '../ModalAddNew/ModalAddNew';

type Props = {
  column: ColumnObjType;
  tasks: PayloadType[];
};

export const Column: FC<Props> = ({ column, tasks }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ModalAddNew
        open={showModal}
        handleClose={() => setShowModal(showModal => !showModal)}
      />

      <Container>
        <Header>
          <Title>{column.title}</Title>

          {column.id === ColumnOrderEnum.TODO
            &&
            <IconBtn onclick={() => setShowModal(true)}>
              <AddIcon />
            </IconBtn>
          }
        </Header>

        <StrictModeDroppable droppableId={column.id}>
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <TaskList
              $isdragging={snapshot.isDraggingOver}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task: PayloadType, index) =>
                <Task key={`${task.id}`} task={task} index={index} />
              )}
              {provided.placeholder}
            </TaskList>
          )}
        </StrictModeDroppable>
      </Container>
    </>
  );
};
