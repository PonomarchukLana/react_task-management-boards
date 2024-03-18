import styled from 'styled-components';

type Props = {
  $isdragging: boolean;
};

export const Container = styled.div`
  min-width: 300px;
  margin: 8px;
  padding: 20px 10px;
  border: 1px solid #6905d0;
  background: #b298e0;
  box-shadow: 10px 10px 0px 0px #FFC107;
  border-radius: 5px;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

export const Title = styled.h3`
  padding: 8px;
  color: #fff;
`;

export const TaskList = styled.div<Props>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.$isdragging ? '#36e6fc' : '#b298e0')};
  min-height: 80%;
  border-radius: 5px;
`;
