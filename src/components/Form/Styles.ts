import styled from 'styled-components';

type Props = {
  $color: boolean;
}

export const FormWrapp = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Button = styled.button<Props>`
  text-transform: uppercase;
  font-weight: 600;
  color: #fff;
  background-color: ${props => (props.$color ? '#6905d0' : '#b298e0')};
  border: none;
  border-radius: 3px;
  min-height: 30px;
  padding: 10px;
  margin-top: 30px;

  ${props => (props.$color && `
    cursor: pointer;
    transition: transform ease-in-out .2s;

    &:hover {
      transform: scale(1.1);
    }
  `)};
`;

export const TextArea = styled.textarea`
  padding: 10px;
  outline: none;
  font-size: 16px;
  border: 1px solid #6905d0;
  border-radius: 3px;
`;
