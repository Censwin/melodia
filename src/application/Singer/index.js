import React, { useState, useRef, useEffect, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import {
  Container,
  ImgWrapper,
  MarkBtn,
  SongListWrapper,
  BgLayer,
} from './style'
import Header from '../../baseUI/header'
import SongList from './../SongList'
import Scroll from '../../baseUI/scroll/index'
import { HEADER_HEIGHT } from './../../api/config'

import { getSingerInfo, changeEnterLoading } from './store/actionCreatores'
import { connect } from 'react-redux'
import Loading from '../../baseUI/loading';
import MusicNote from "../../baseUI/mini-note";
function Singer(props) {
  const [showStatus, setShowStatus] = useState(true)

  const musicNoteRef = useRef();

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
  };
  const {
    artist: immutableArtList,
    songsOfArtist: immutableSongs,
    enterLoading,
  } = props
  const { getSingerDataDispatch } = props
  const artist = immutableArtList.toJS()
  const songs = immutableSongs.toJS()
  const songsListProps = {
    songs,
    collectCount: songs.length,
    showCollect: false,
    musicAnimation
  }
  const collectButton = useRef()
  const imageWrapper = useRef()
  const songScrollWrapper = useRef()
  const songScroll = useRef()
  const header = useRef()
  const layer = useRef()

  // 图片高度
  const initheight = useRef(0)
  const OFFSET = 5

  useEffect(() => {
    const id = props.match.params.id
    getSingerDataDispatch(id)
    let h = imageWrapper.current.offsetHeight
    songScrollWrapper.current.style.top = `${h - OFFSET}px`
    initheight.current = h
    layer.current.style.top = `${h - OFFSET}px`
    songScroll.current.refresh()
  }, [])
  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false)
  }, [])
  const handleScroll = (el) => {
    let height = initheight.current // 背景图div高度
    const newY = el.y // 下方列表Y坐标
    const imageDOM = imageWrapper.current
    const buttonDOM = collectButton.current
    const layerDOM = layer.current
    const headerDOM = header.current
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT
    const percent = Math.abs(newY / height)
    // 处理往下拉的情况，效果：图片放大，按钮跟着偏移
    if (newY > 0) {
      imageDOM.style['transform'] = `scale(${1 + percent})`
      buttonDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`
      layerDOM.style.top = `${height - OFFSET + newY}px`
    } else if (newY >= minScrollY) {
      // 往上滑动，但是遮罩还没超过 Header 部分
      layerDOM.style.top = `${height - OFFSET + newY}px`
      layerDOM.style.zIndex = 2
      imageDOM.style.paddingTop = '75%'
      imageDOM.style.height = 0
      imageDOM.style.zIndex = -1
      // 按钮逐渐隐藏
      buttonDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`
      buttonDOM.style['opacity'] = `${1 - percent * 5}`
    } else if (newY < minScrollY) {
      // 往上滑动，但是超过 Header 部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`
      layerDOM.style.zIndex = 1
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = 100
      // 此时图片高度与 Header 一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`
      imageDOM.style.paddingTop = 0
      imageDOM.style.zIndex = 99
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
        <Header
          title={'头部'}
          handleClick={setShowStatusFalse}
          ref={header}
        ></Header>
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter"></div>
        </ImgWrapper>
        <MarkBtn ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </MarkBtn>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll onScroll={handleScroll} ref={songScroll}>
            <SongList {...songsListProps}></SongList>
          </Scroll>
        </SongListWrapper>
        { enterLoading ? <div><Loading></Loading></div> : null }
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => {
  return {
    artist: state.getIn(['singerInfoReducer', 'artist']),
    songsOfArtist: state.getIn(['singerInfoReducer', 'songsOfArtist']),
    enterLoading: state.getIn(['singerInfoReducer', 'loading']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingerDataDispatch(id) {
      dispatch(changeEnterLoading(true))
      dispatch(getSingerInfo(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer))
