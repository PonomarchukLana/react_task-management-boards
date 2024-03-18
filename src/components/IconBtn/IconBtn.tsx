import React, { FC, ReactNode } from 'react';
import { IconWrapp } from './Styles';

type Props = {
  onclick: () => void;
  children: ReactNode;
}

export const IconBtn: FC<Props> = ({onclick, children}) => {
  return (
    <IconWrapp onClick={onclick}>
      {children}
    </IconWrapp>
  );
};
