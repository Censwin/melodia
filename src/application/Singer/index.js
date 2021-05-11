import React, { useState, useRef, useEffect, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container, ImgWrapper, MarkBtn, SongListWrapper,BgLayer } from './style'
import Header from '../../baseUI/header'
import SongList from './../SongList'
import Scroll from '../../baseUI/scroll/index'
import { HEADER_HEIGHT } from "./../../api/config";
const artist = {
  picUrl:
    'https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg',
  name: '薛之谦',
  hotSongs: [
    { id: 1,
      name: '我好像在哪见过你',
      ar: [{ name: '薛之谦' }],
      al: {
        name: '薛之谦专辑',
      },
    },
    {
      id: 2,
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
  const songsListProps = {
    songs: artist.hotSongs,
    collectCount: artist.hotSongs.length,
    showCollect: false
    }
  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();

  // 图片高度
  const initheight = useRef(0);
  const OFFSET = 5;

  useEffect(() => {
    let h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initheight.current = h;
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh ();
  }, [])
  const setShowStatusFalse = useCallback (() => {
    setShowStatus (false);
  }, []);
  const handleScroll = el => {
    let height = initheight.current; // 背景图div高度
    const newY = el.y; // 下方列表Y坐标
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const layerDOM = layer.current;
    const miniScrollY = -(height - OFFSET) + HEADER_HEIGHT;
    const percent = Math.abs(newY/height);
    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1+percent})`
      buttonDOM.style ["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    }
    if (newY >= miniScrollY) {
      layerDOM.style.top = `${height - OFFSET + newY}px`;
      layerDOM.style.zIndex = 2;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      // 按钮逐渐隐藏
      buttonDOM.style ["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 5}`
    }
  }
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
        <Header title={'头部'} handleClick={setShowStatusFalse} ref={header}></Header>
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter"></div>
        </ImgWrapper>
        <MarkBtn  ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </MarkBtn>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll onScroll={handleScroll} ref={songScroll}>
            <SongList {...songsListProps}></SongList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Singer)
