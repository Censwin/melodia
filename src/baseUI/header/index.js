import React from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'
import PropTypes from "prop-types";

const HeaderContainer = styled.div`
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${style["font-color-light"]};
  >i {
    font-size: 20px;
    width: 20px;
    margin: 0 10px;
  }
  >h1 {
    font-size: ${style ["font-size-l"]};
    font-weight: 700;
  }
`
function Header(props) {
  const {handleClick, title} = props
  return (
    <HeaderContainer>
      <i className="iconfont back" onClick={() => handleClick()}>&#xe655;</i>
      <h1>{title}</h1>
      <i className="iconfont option">&#xe65c;</i>
    </HeaderContainer>
  )
}
Header.defaultProps = {
  handleClick: () => {},
  title: '推荐'
}
Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string
}
export default Header
