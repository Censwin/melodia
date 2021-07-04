import styled from 'styled-components/macro'
import style from '../../assets/global-style'
export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: ${style['background-color-shadow']};
  &.fly-enter {
    /* transform: translateX(-100%) */
    opacity: 0;
  }
  &.fly-enter-active {
    transition: all .5s;
    opacity: 1;
    /* transform: translateX(0); */
  }
  &.fly-exit-active {
    transition: all .5s;
    opacity: 0;
    /* transform: translateX(-100%) */
  }
`

export const Wrapper = styled.div`
  width: 70%;
  height: 100%;
  transform: translateX(-100%);
  background-color: ${style['background-color']};
`