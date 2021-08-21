import styled from "styled-components/macro";
import style from '../../assets/global-style'
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

export const ShortcutWrapper = styled.div`
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  display: ${props => props.show ? "":"none"};
`

export const HotKey = styled.div`
  margin: 0 20px 20px 20px;
  .item-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    .item {
      width: 50%;
      padding: 10px 0;
      font-size: ${style["font-size-m"]};
      color: ${style["font-color-desc"]};
      .row_num {
        margin-right: 10px;
        font-size: ${style["font-size-l"]};
      }
    }
    & .item:nth-child(-n + 3) {
      .row_num {
        color: ${style["theme-color"]}
      }
    }
    & .item:not(:nth-child(-n + 3)) {
      .row_num {
        color: ${style["font-color-desc-v3"]};
      }
    }
  }
  .title {
    padding-top: 35px;
    margin-bottom: 20px;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc-v2"]};
  }
`
export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: ${style["font-color-desc"]};
    font-size: ${style["font-size-s"]};
  }
`;
export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${style["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
    font-weight: 500;
  }
`;
export const SongItem = styled.ul`
  >li {
    display: flex;
    height: 60px;
    align-items: center;  
    .index {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${style["border-color"]};
      >span:first-child {
        color: ${style["font-color-desc"]};
      }
      >span:last-child {
        font-size: ${style["font-size-s"]};
        color: #bba8a8;
      }
    }
  }
`