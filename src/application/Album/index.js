import React, { useEffect, useState } from 'react'
import { Container } from './style'
import { CSSTransition } from 'react-transition-group'
import Header from '../../baseUI/header'
import {currentAlbum} from './mock'
import Scroll from '../../baseUI/scroll/index';

function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  useEffect(() => {
  })
  const HeaderProps = {
    title: '歌手',
    handleClick: () => {
      setShowStatus(false)
    }
  }
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header {...HeaderProps} />
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Album)
