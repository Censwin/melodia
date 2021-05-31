import styled from 'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  background: #fff;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear{
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active{
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit{
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active{
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0px;    
  padding-top: 75%;
  transform-origin: center top;
  background: url(${props => props.bgUrl}) no-repeat;
  background-size: cover;
  z-index: 51;
  .filter { // 这是一个滤镜
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);
  }
`

export const MarkBtn = styled.div`
  background: ${style ["theme-color"]};
  width: 110px;
  height: 40px;
  color: ${style["font-color-light"]};
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: -55px;
  z-index: 51;
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    font-size: ${style["font-size-s"]};
    vertical-align: 1px;
  }
  .text {
    display: inline-block;
    font-size: ${style["font-size-m"]};
    letter-spacing: 5px;
  }
`

export const BgLayer = styled.div` // 一个白色背景遮罩
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  z-index: 50;
`

export const SongListWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  >div {
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`

