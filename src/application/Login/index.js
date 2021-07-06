import React, {useEffect, useState, useRef} from 'react';
import { CSSTransition } from 'react-transition-group'
import {Container} from './style'
function Login(props) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
  }, [])
  const phoneRef = useRef()
  const pwdRef = useRef()
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  return (
    <CSSTransition
      classNames="flow"
      timeout={500}
      in={show}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container onClick={e => e.stopPropagation()}>
        <span onClick={() => setShow(false)} className="iconfont closeIcon">&#xe600;</span>
        <p className="slogen">发现音乐的力量</p>
        <div className="form-wrapper">
          <input type="tel" ref={phoneRef}></input>
          <input type="password" ref={pwdRef}></input>
          <div className="submit-btn" onClick={handleSubmit}>登录</div>
        </div>
      </Container>
    </CSSTransition>
  )
}

export default Login
