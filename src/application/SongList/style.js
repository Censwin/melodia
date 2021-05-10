import styled from 'styled-components'
import style from '../../assets/global-style'

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
