import React, { FC, useState } from 'react';
import { Button, FormWrapp, TextArea } from './Styles';
import { Input } from '../Input/Input';

type Props = {
  onsubmit: (title: string, description: string) => void;
  defaultTitle?: string;
  defaultDescription?: string;
}

export const Form: FC<Props> = ({
  onsubmit, defaultTitle, defaultDescription
}) => {
  const [titleValue, setTitleValue] = useState(defaultTitle || '');
  const [descriptionValue, setDescriptionValue] =
    useState(defaultDescription || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onsubmit(titleValue, descriptionValue);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(e.target.value);
  };

  return (
    <FormWrapp onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor='title'>Add title</label>
      <Input
        type='text'
        name='title'
        value={titleValue}
        onChange={handleTitle}
      />

      <label htmlFor='description'>Add description</label>
      <TextArea
        rows={5}
        name='description'
        value={descriptionValue}
        onChange={handleDescription}
      />

      <Button
        type='submit'
        $color={Boolean(titleValue) || Boolean(descriptionValue)}
      >
        Add
      </Button>
    </FormWrapp>
  );
};
