import React, { FC, useState } from 'react';
import { Input } from '../Input/Input';

type Props = {
  placeholder: string;
  onSearch: (value: string) => void;
}

export const Search: FC<Props> = ({ placeholder, onSearch}) => {
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    onSearch(e.target.value);
  };

  return (
    <Input
      type='search'
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
    />
  );
};
