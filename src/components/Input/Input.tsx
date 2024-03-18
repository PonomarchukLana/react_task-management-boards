import React, { ChangeEvent, FC } from 'react';
import { InputWrapp } from './Styles';

type Props = {
  type: string;
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<Props> = (props) => {
  return (
    <InputWrapp {...props} />
  );
};
