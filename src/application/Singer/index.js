import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container, ImgWrapper, MarkBtn, SongListWrapper,BgLayer } from './style'
import Header from '../../baseUI/header'
import SongList from './../SongList'
const artist = {
  picUrl:
    'https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg',
  name: '薛之谦',
  hotSongs: [
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑',
      },
    },
    {
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑',
      },
    },
    // 省略 20 条
  ],
}

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true)
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExit={() => {
        props.history.goBack()
      }}
    >
      <Container>
        <Header title={'头部'}></Header>
        <ImgWrapper bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <MarkBtn>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </MarkBtn>
        <BgLayer></BgLayer>
        <SongListWrapper></SongListWrapper>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Singer)
