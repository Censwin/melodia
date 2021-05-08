import React, {useState} from 'react'
import { CSSTransition } from 'react-transition-group';
import { Container } from './style'
function Singer(props) {
  const [showStatus, setShowStatus] = useState(true)
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExit={() => {props.history.goBack()}}
    >
      <Container>123</Container>
    </CSSTransition>
  )
}

export default  React.memo(Singer)
