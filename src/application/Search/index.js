import React, {useState, useEffect} from 'react'
import { CSSTransition } from 'react-transition-group'
import {Container} from './style'
function Search (props) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
  }, [])
  return (
    <CSSTransition 
      in={show}
      timeout={500}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <div onClick={() => setShow(false)}>返回</div>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Search)
