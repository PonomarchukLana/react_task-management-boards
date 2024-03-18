import React, { FC, useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Container, IconsWrapp, TextId } from './Styles';
import { IconBtn } from '../IconBtn/IconBtn';
import { useAppDispatch } from '../../app/hooks';
import { deleteTask } from '../../store/tasks/tasksSlice';
import { ModalAddNew } from '../ModalAddNew/ModalAddNew';
import { PayloadType } from '../../types/Types';

type Props = {
  task: PayloadType;
  index: number;
}

export const Task: FC<Props> = ({ task, index }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  return (
    <>
      <ModalAddNew
        open={showModal}
        handleClose={() => setShowModal(showModal => !showModal)}
        editData={task}
      />

      <Draggable draggableId={`${task.id}`} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container
            $isdragging={snapshot.isDragging}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div>
              <TextId>id: {task.id}</TextId>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>

            <IconsWrapp>
              <IconBtn onclick={handleEdit}>
                <EditNoteIcon />
              </IconBtn>

              <IconBtn onclick={() => handleDelete(`${task.id}`)}>
                <DeleteOutlineIcon />
              </IconBtn>
            </IconsWrapp>
          </Container>
        )}
      </Draggable>
    </>
  );
};
