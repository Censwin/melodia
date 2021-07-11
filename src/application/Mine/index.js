import React, { useState, useEffect,useRef, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container, Wrapper } from './style'
import { prefixStyle } from './../../api/utils'
import { handleLogout } from '../Login/store/actionCreators'
import { connect } from 'react-redux';
import defaultAvatar from './../../assets/img/defultavatar.png'
function Mine(props) {
  const {logoutDispatch} = props
  const {loginStatus, userInfo: userInfoImmutable} = props;
  const userInfo = userInfoImmutable.toJS()
  const {nickname, avatarUrl} = userInfo
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
  const handleLogin = () => {
    if (loginStatus === false) {
      props.history.push('/login')
    }
  }
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
          <div className="loginStatus">
            {/* <span className="iconfont menu">&#xe619;</span> */}
            <span className="header_wrapper">
              <img src={loginStatus ? `${avatarUrl}?param=50y50` : defaultAvatar} alt="" />
            </span>
            <span className="userName" onClick={handleLogin}>{loginStatus ? nickname : '立即登录 >'}</span>
          </div>
          <div className="advertising">
            <p>广告位招租</p>
          </div>
          {loginStatus && <div className="logoutBtn" onClick={logoutDispatch}>
            退出登录
          </div>}
        </Wrapper>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.getIn(['user', 'loginStatus']),
    userInfo: state.getIn(['user', 'userInfo']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutDispatch () {
      dispatch(handleLogout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Mine))
