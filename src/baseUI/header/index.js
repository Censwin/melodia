import React from 'react'
import styled from 'styled-components/macro'
import style from '../../assets/global-style'
import PropTypes from 'prop-types'

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${style['font-color-light']};
  > i {
    font-size: 20px;
    width: 20px;
    margin: 0 10px;
  }
  > h1 {
    font-size: ${style['font-size-l']};
    font-weight: 700;
  }
`

const Header = React.forwardRef((props, ref) => {
  const { handleClick, title, isMarquee } = props
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={() => handleClick()}>
        &#xe655;
      </i>
      {isMarquee ? (
        <marquee>
          <h1>{title}</h1>
        </marquee>
      ) : (
        <h1>{title}</h1>
      )}
    </HeaderContainer>
  )
})

Header.defaultProps = {
  handleClick: () => {},
  title: '推荐',
  isMarquee: false,
}
Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool,
}
export default Header
