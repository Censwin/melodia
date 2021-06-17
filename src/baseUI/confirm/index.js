import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components/macro'
import { prefixStyle } from '../../api/utils'
import globalStyle from '../../assets/global-style'

const ConfirmWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1010;
  &.confirm-fade-enter,&.confirm-fade-appear {
    opacity: 0;
  }
  &.confirm-fade-enter-active, &.confirm-fade-appear-active {
    opacity: 1;
    transition: all .5s;
  }
  &.confirm-fade-exit {
    opacity: 1;
  }
  &.confirm-fade-exit-active {
    opacity: 0;
    transition: all .5s;
  }
  .confirmContainer {
    position: absolute;
    left: 0;
    bottom: 0;
    background: ${globalStyle['highlight-background-color']};
    width: 100%;
    height: 150px;
    border: 1px solid ${globalStyle['border-color']};
    border-radius: 10px;
    padding: 25px;
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

const Confirm = forwardRef((props, ref) => {
  const {text} = props;
  const {handleConfirm} = props
  const [show, setShow] = useState(false)
  const [wrapperShow, setWrapperShow] = useState(false)
  const confirmContainerRef = useRef()
  useImperativeHandle(ref, () => {
    return {
      show() {
        setShow(true)
      },
    }
  })
  const transform = prefixStyle('transform')
  const onEnterCB = () => {
    setWrapperShow(true)
    confirmContainerRef.current.style[transform] = 'translate3d(0, 100%, 0)'
  }
  const onEnteringCB = () => {
    confirmContainerRef.current.style['transition'] =
      'all 1s cubic-bezier(0.22, 0.61, 0.36, 1)'
    confirmContainerRef.current.style[transform] = 'translate3d(0, 0, 0)'
  }
  const onExitCB = () => {
    confirmContainerRef.current.style['transition'] =
      'all 1s cubic-bezier(0.22, 0.61, 0.36, 1)'
    confirmContainerRef.current.style[transform] = 'translate3d(0, 100%, 0)'
  }
  const onExitedCB = () => {
    console.log(123);
    setWrapperShow(false)
  }
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="confirm-fade"
      appear={true}
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExit={onExitCB}
      onExited={onExitedCB}
    >
      <ConfirmWrapper style={{ display: wrapperShow ? 'block' : 'none' }} onClick={e => e.stopPropagation()}>
        <div
          className="confirmContainer"
          ref={confirmContainerRef}
        >
          <div className="confirm_content">
            <div className="title">
              <span className="_symbol">？</span>
              <span>提示</span>
            </div>
            <div className="text">{text}</div>
            <div className="buttonWrapper">
              <span className="cancel" onClick={_ => {setShow(false)}}>取消</span>
              <span className="ok" onClick={_ => {setShow(false); handleConfirm()}}>确认</span>
            </div>
          </div>
        </div>
      </ConfirmWrapper>
    </CSSTransition>
  )
})

export default React.memo(Confirm)
