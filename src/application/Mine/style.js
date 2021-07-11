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
  width: 90%;
  height: 100%;
  transform: translateX(-100%);
  background-color: ${style['background-color']};
  display: flex;
  flex-direction: column;
  position: relative;
  .loginStatus {
    font-size: ${style['font-size-m']};
    padding: 1.5em;
    display: flex;
    align-items: center;
    .header_wrapper {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
      margin-right: .5em;
      img {
        max-width: 100%;
        vertical-align: middle;
      }
    }
  }
  .advertising {
    width: 90%;
    height: 130px;
    background-color: #888888;
    background-image: linear-gradient(to bottom right,#888888,#B0B0B0);
    border-radius: 10px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: ${style['font-size-ll']};
      color: #fff;
    }
  }
  .logoutBtn {
    width: 90%;
    height: 2.5em;
    line-height: 2.5em;
    text-align: center;
    background-color: ${style['font-color-light']};
    color: ${style['theme-color']};
    border-radius: .5em;
    position: absolute;
    bottom: 1em;
  }
`