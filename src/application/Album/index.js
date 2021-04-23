//src/application/Album/index.js
import React, {useState, useEffect} from 'react';
import {Container} from './style';
import {CSSTransition} from 'react-transition-group'

function Album (props) {
  const [showStatus, setShowStatus] = useState(true)
  useEffect(() => {
    console.log(12321312);
  }, [])
  return (
    <CSSTransition in={showStatus} timeout={300} classNames="fly" appear={true} unmountOnExit onExited={props.history.goBack}>
      <Container>
        123
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Album)