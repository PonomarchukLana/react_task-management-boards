import React, { FC } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Form } from '../Form/Form';
import { useAppDispatch } from '../../app/hooks';
import { addTask, updateTask } from '../../store/tasks/tasksSlice';
import { PayloadType } from '../../types/Types';

type Props = {
  open: boolean;
  handleClose: () => void;
  editData?: PayloadType;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #6905d0',
  borderRadius: '5px',
  boxShadow: 24,
  p: '60px'
};

export const ModalAddNew: FC<Props> = ({ open, handleClose, editData }) => {
  const dispatch = useAppDispatch();

  const submitTask = (title: string, description: string) => {
    if (editData) {
      dispatch(updateTask({
        id: editData.id,
        title,
        description,
        status: editData.status,
        index: editData.index
      }));
    } else {
      if (title.length > 0 || description.length > 0) {
        dispatch(addTask({ title, description }));
      }
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <Form
          onsubmit={submitTask}
          defaultTitle={editData?.title}
          defaultDescription={editData?.description}
        />
      </Box>
    </Modal>
  );
};
