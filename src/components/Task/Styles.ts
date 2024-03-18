import styled from 'styled-components';

type Props = {
  $isdragging: boolean;
};

export const Container = styled.div<Props>`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.$isdragging ? '#07ff5d' : '#fff')};
`;

export const IconsWrapp = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

export const TextId = styled.p`
  opacity: 0.6;
  text-align: right;
  font-size: 12px;
  margin: 0;
`;
