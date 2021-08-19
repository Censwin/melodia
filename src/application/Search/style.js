import styled from "styled-components/macro";

export const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  background: #f2f3f4;
  &.fly-enter {
    transform: translateX(100%);
  }
  &.fly-enter-active {
    transform: translateX(0);
    transition: all .5s;
  }
  &.fly-exit {
    transform: translateX(0);
  }
  &.fly-exit-active {
    transform: translateX(100%);
    transition: all .5s;
  }
`