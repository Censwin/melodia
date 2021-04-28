import React,{useEffect} from 'react'
import {Container} from './style'
import { CSSTransition } from 'react-transition-group';

function Album() {
  useEffect(() => {
    // console.log(123123123);
  })
  return (
    <Container>
      123
    </Container>
  )
}

export default React.memo(Album)
