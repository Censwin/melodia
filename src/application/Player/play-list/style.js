import styled from 'styled-components/macro'
import style from '../../../assets/global-style'

export const PlayListWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: ${style['background-color-shadow']};
  &.list-fade-enter,&.list-fade-appear {
    opacity: 0;
  }
  &.list-fade-enter-active, &.list-fade-appear-active {
    opacity: 1;
    transition: all .5s;
  }
  &.list-fade-exit {
    opacity: 1;
  }
  &.list-fade-exit-active {
    opacity: 0;
    transition: all .5s;
  }
  .list_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    z-index: 1001;
    background: ${style['background-color']};
    border-radius: 8px 8px 0 0;
    transform: translate3d(0, 0, 0);
    .list_close {
      text-align: center;
      line-height: 50px;
      background: ${style['background-color']};
      font-size: ${style['font-size-l']};
      color: ${style['font-color-desc']};
    }
  }
`

export const ScrollWrapper = styled.div`
  height: 60vh;
  overflow: hidden;
`

export const ListContainer = styled.ul`
  .controlBar {
    display: flex;
    justify-content: space-around;
    line-height: 2em;
    .modetext {
      padding-left: 5px;
      flex: 1;
    }
  }
  .playIcon {
    margin-right: 10px;
    font-size: ${style['font-size-s']};
  }
  .iconfont {
    color: ${style['theme-color']};
  }
  padding: 10px 15px;
  .item {
    display: flex;
    justify-content: space-around;
    line-height: 2.5em;
    .text {
      flex: 1;
      color: ${style['font-color-desc-v2']};
      font-size: ${style['font-size-m']};
    }
    .like {
      margin-right: 10px;
    }
  }
`
