import styled, { keyframes } from 'styled-components';
import style from '../../../assets/global-style';

const rotate = keyframes`
  from{
    transform: rotate(0);
  }
  to{
    transform: rotate(360deg);
  }
`;

export const MiniPlayerContainer = styled.div`
display: flex;
align-items: center;
`