import styled from 'styled-components/macro';

export const Content = styled.div`
  position: fixed;
  top: 95px;
  bottom: 0;
  width: 100%;
  padding-bottom: ${props => props.count > 0 ? '60px' : 0};
`