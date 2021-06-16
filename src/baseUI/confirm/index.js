import React from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components/macro'
import globalStyle from '../../assets/global-style'

const ConfirmWrapper = styled.div`
position: fixed;
left: 0;
right: 0;
top: 0;
bottom: 0;
z-index: 2000;
.confirmContainer{
  position: absolute;
  left: 0;
  bottom: 0;
  background: ${globalStyle['highlight-background-color']};
  width: 100%;
  height: 150px;
  border: 1px solid ${globalStyle['border-color']};
  border-radius: 10px;
  padding:25px;
  box-sizing: border-box;
  .confirm_content {
    .title {
      ._symbol {
        width: 1em;
        height: 1em;
        border-radius: 2em;
        background: orange;
        color: white;
        margin-right: 12px;
        box-sizing: border-box;
        display: inline-block;
        padding-left: 3px;
      }
      margin-bottom: 15px;
    }
    .text {
      margin-left: 2em;
      color: ${globalStyle['font-color-desc-v2']};
      font-size: ${globalStyle['font-size-m']};
    }
    .buttonWrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-top: 1px solid ${globalStyle['border-color']};
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: ${globalStyle['font-size-m']};
        text-align: center;
        flex: 1;
        border-right: 1px solid ${globalStyle['border-color']};
        padding: 1em 0;
      }
      .ok {
        background: ${globalStyle['theme-color']};
        color: white;
      }
    }
  }
}
`

export default function Confirm(props) {
  return (
    <CSSTransition>
      <ConfirmWrapper>
        <div className="confirmContainer">
        <div className="confirm_content">
          <div className="title">
            <span className="_symbol">？</span>
            <span>提示</span>
          </div>
          <div className="text">
          是否删除全部歌曲？
          </div>
          <div className="buttonWrapper">
            <span className="cancel">
              取消
            </span>
            <span className="ok">
              确认
            </span>
          </div>
        </div>
          </div>
      </ConfirmWrapper>
    </CSSTransition>
  )
}
