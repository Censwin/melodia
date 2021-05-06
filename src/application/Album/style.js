import styled from 'styled-components'
import style from '../../assets/global-style'

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

export const TopDesc = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 275px;
  position: relative;
  flex-direction:column;
  .background {
    position:absolute;
    top: 0;
    left: 0;
    background: url(${props => props.background}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    filter: blur(10px);
    width: 100%;
    height: 100%;
    z-index: -1;
    /* .filter {
      position: absolute;
      z-index: 10;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba (7, 17, 27, 0.2);
    } */
  }
  .info_wrapper {
    width: 100%;
    height: 275px;
    display: flex;
    justify-content: space-between;
    padding: 70px 20px 0;
    .imgWrapper {
      position: relative;
      .decorate {
        position: absolute;
        top: 0;
        width: 100%;
        height: 35px;
        border-radius: 3px;
        background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
        z-index: 1;
      }
      .play_count {
        position: absolute;
        top: 5px;
        right: 5px;
        text-align: right;
        width: 100%;
        font-size: ${style["font-size-ss"]};
        color: #fff;
        z-index: 1;
      }
      img {
        width: 120px;
        height: 120px;
      }
    }
    .billName {
      width: 100%;
      display:flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 20px;
      height: 120px;
      .title {
        max-height: 70px;
        color: ${style ["font-color-light"]};
        font-weight: 700;
        line-height: 1.5;
        font-size: ${style ["font-size-l"]};
        padding-right: 2em;
      }
      .person {
        display: flex;
        .avatar {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .name {
          line-height: 20px;
          font-size: ${style ["font-size-m"]};
          color: ${style ["font-color-desc-v2"]};
        }
      }
    }
  }
`

export const Menu = styled.div`
  color: ${style["font-color-light"]};
  font-size: ${style["font-size-ss"]};
  display:flex;
  justify-content:space-around;
  div {
    display: flex;
    flex-direction:column;
    align-items: center;
    padding: 8px;
    i {
      margin-bottom: 4px;
    }
  }
`

export const SongList = styled.div`
  position: relative;
  border-radius: 5px 5px 0 0;
  .first_line {
    display: flex;
    height: 3em;
    justify-content:space-between;
    align-items:center;
    border-bottom: 1px solid ${style ["border-color"]};
    .play_all {
      padding-left: 10px;
      .iconfont {
        font-size: 24px;
        margin-right:5px;
        vertical-align: text-bottom;
      }
      .sum {
        margin-left: 5px;
        vertical-align: middle;
        font-size: ${style["font-size-s"]};
        color: ${style["font-color-desc-v2"]};
        >span {
          vertical-align: top;
        }
      }
    }
    .markBill{
      display: flex;
      align-items:center;
      background: ${style["theme-color"]};
      color: ${style["font-color-light"]};
      height:100%;
      padding-right: 40px;
      border-radius: 5px 0 0 5px;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0 5px 0 10px;
      }
      span {
        font-size: 14px;
        line-height: 34px;
      }
    }
  }
`

export const SongItem = styled.ul`
  li {
    display: flex;
    height: 60px;
    align-items: center;
    padding: 3px 0;
  }
  .index {
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
  }
  .info{
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 5px 0;
    justify-content: space-around;
    border-bottom: 1px solid ${style["border-color"]};
    ${style.noWrap()}
    >span:first-child {
      color: ${style["font-color-desc"]};
    }
    >span:last-child {
      font-size: ${style["font-size-s"]};
      color: #bba8a8;
    }
  }
`
