import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import { handleLogin, handleLogout } from './store/actionCreators';
import {Container} from './style'
function Login(props) {
  const {loginDispatch, logoutDispatch} = props
  const {loginStatus} = props
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (loginStatus === true) {
      setShow(false)
    } 
  }, [loginStatus])
  useEffect(() => {
    setShow(true)
  }, [])
  const [formValue, setFormVal] =useState({
    account: "",
    pwd: ""
  })
  const handleSubmit = (event) => {
    loginDispatch(formValue)
    event.preventDefault();
  }
  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormVal({...formValue,[name]: value})
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
          <input type="tel" name="account" placeholder="网易邮箱" onChange={handleChangeInput} ></input>
          <input type="password" name="pwd" placeholder="密码" onChange={handleChangeInput}></input>
          <div className="submit-btn" onClick={handleSubmit}>登录</div>
          {/* <div className="submit-btn" onClick={logoutDispatch}>退出登录</div> */}
        </div>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.getIn(['user', 'loginStatus']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginDispatch (params) {
      dispatch(handleLogin(params))
    },
    logoutDispatch () {
      dispatch(handleLogout())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Login))
