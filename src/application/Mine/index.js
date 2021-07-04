import React, { useState, useEffect,useRef, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container, Wrapper } from './style'
import { prefixStyle } from './../../api/utils'
function Mine(props) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
  }, [])
  const wrapperRef = useRef()
  const transform = prefixStyle('transform')
  const onEnteringCB = useCallback(
    () => {
      wrapperRef.current.style[transform] = 'translateX(0)'
      wrapperRef.current.style['transition'] = 'all 0.5s'
    },
    [transform],
  )
  const onExitingCB = useCallback(
    () => {
      wrapperRef.current.style[transform] = 'translateX(-100%)'
      wrapperRef.current.style['transition'] = 'all 0.5s'
    },
    [transform],
  )
  return (
    <CSSTransition
      classNames="fly"
      timeout={500}
      in={show}
      unmountOnExit
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={() => props.history.goBack()}
    >
      <Container onClick={() => setShow(false)}>
        <Wrapper
          ref={wrapperRef}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <span></span>
          <h1></h1>
        </Wrapper>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Mine)
