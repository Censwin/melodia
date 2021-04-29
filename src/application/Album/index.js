import React,{useEffect, useState} from 'react'
import {Container} from './style'
import { CSSTransition } from 'react-transition-group';

function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  useEffect(() => {
    // console.log(123123123);
  })
  return (
      <CSSTransition in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}>
        <Container>
          123
        </Container>
      </CSSTransition>
  )
}

export default React.memo(Album)
