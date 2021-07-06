import styled from 'styled-components/macro'
import style from '../../assets/global-style'

export const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${style['theme-color']};
    padding: 1em;
    box-sizing: border-box;
    &.flow-enter{
      transform: translateY(100%);
    }
    &.flow-enter-active {
      transform: translateY(0);
      transition: all .5s;
    }
    &.flow-exit-active {
      transform: translateY(100%);
      transition: all .5s;
    }
    .closeIcon {
      font-size: 2em;
      color: ${style['font-color-light']};
    }
    .slogen {
      position: absolute;
      top: 50%;left: 50%;
      transform: translate(-50%, -50%);// 沿着x\y轴平移自身一半的高度
      color: ${style['font-color-light']};
    }
    .form-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 150px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .submit-btn {
        width: 90%;
        height: 2.5em;
        line-height: 2.5em;
        text-align: center;
        background-color: ${style['font-color-light']};
        color: ${style['theme-color']};
        border-radius: 2.5em;
      }
    }
`