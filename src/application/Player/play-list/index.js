import React, { useState, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { PlayListWrapper, ScrollWrapper, ListContainer } from './style'
import { prefixStyle, getName, findIndex } from './../../../api/utils'
import {
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayMode,
  changePlayList,
  changePlayingState,
  deleteSong,
  clearSongs
} from '../store/actionCreators'
import { playMode } from '../../../api/config'
import Scroll from '../../../baseUI/scroll'
import Confirm from '../../../baseUI/confirm'

function PlayList(props) {
  const {
    showPlayList,
    playListData: playListDataImmutable,
    currentIndex,
    mode,
    playing,
    sequencePlayList: sequencePlayListImmu
  } = props
  const {
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changeModeDispatch,
    togglePlayingDispatch,
    changeMode,
    deleteSongDispatch,
    toggleSequenceListDispatch,
    clearSongsDispatch
  } = props;
  const playListData = playListDataImmutable.toJS()
  const sequencePlayList = sequencePlayListImmu.toJS()
  const playListRef = useRef()
  const listWrapperRef = useRef()
  const [isShow, setIsShow] = useState(false)
  const [modeText, setModeText] = useState('')
  const getCurrentIcon = (index) => {
    if (currentIndex === index) {
      return (
        <i
          className="iconfont playIcon"
          dangerouslySetInnerHTML={{ __html: '&#xe6e3;' }}
        ></i>
      )
    } else {
      return (
        <i className="iconfont" style={{ opacity: 0 }}>
          &#xe6e3;
        </i>
      )
    }
  }
  const transform = prefixStyle('transform')
  const onEnterCB = useCallback(() => {
    setIsShow(true)
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`
  }, [transform])
  const onEnteringCB = useCallback(() => {
    listWrapperRef.current.style[
      'transition'
    ] = `all .5s cubic-bezier(0.22, 0.61, 0.36, 1)`
    listWrapperRef.current.style[transform] = `translate3d(0, 0, 0)`
  }, [transform])
  const onExitCB = useCallback(() => {
    listWrapperRef.current.style[
      'transition'
    ] = `all .5s cubic-bezier(0.22, 0.61, 0.36, 1)`
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`
  }, [transform])
  const onExitedCB = useCallback(() => {
    setIsShow(false)
  }, [transform])

  // 业务逻辑开始
  const handleClickSong = (index) => {
    if (currentIndex === index) return;
    const item = playListData[index]
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
    changeCurrentDispatch(item)
  }
  const getPlayMode = () => {
    let content, text
    if (mode === playMode.sequence) {
      content = '&#xe625;'
      text = '顺序播放'
    } else if (mode === playMode.loop) {
      content = '&#xe653;'
      text = '单曲循环'
    } else {
      content = '&#xe61b;'
      text = '随机播放'
    }
    return (
    <li className="controlBar">
    <i
      className="iconfont"
      dangerouslySetInnerHTML={{ __html: content }}
    ></i>
    <span className="modetext" onClick={_ => changeMode()}>{text}</span>
    <span className="delete" onClick={e => handleShowConfirm(e)}>
      <i className="iconfont">&#xe63d;</i>
    </span>
  </li>)
  }
  // const handleChangeMode = _ => {
  //   changeMode()
  // }
  const handleDeleteSong = (e, item) => {
    e.stopPropagation()
    deleteSongDispatch(item)
  }
  // 删除及确认
  const confirmRef = useRef()
  const handleShowConfirm = (e) => {
    e.stopPropagation()
    confirmRef.current.show()
  }
  const deleteAllSong = () => {
    clearSongsDispatch()
  }
  const confirmProps = {
    text: '是否删除全部歌曲？',
    handleConfirm: deleteAllSong
  }
  return (
    <CSSTransition
      timeout={500}
      classNames="list-fade"
      in={showPlayList}
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExit={onExitCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper
        ref={playListRef}
        onClick={e => {e.stopPropagation();togglePlayListDispatch(false)}}
        style={{ display: isShow ? 'block' : 'none' }}
      >
        <div className="list_wrapper" ref={listWrapperRef}>
          <ScrollWrapper>
            <ListContainer>
              {getPlayMode()}
              {playListData.map((item, index) => {
                return (
                  <li className="item" key={item.id}>
                    {getCurrentIcon(index)}
                    <span
                      className="text"
                      onClick={_ => handleClickSong(index)}
                    >{`${item.name} - ${getName(item.ar)}`}</span>
                    <span className="like">
                      <i className="iconfont">&#xe601;</i>
                    </span>
                    <span className="delete" onClick={(e) => handleDeleteSong(e, item)}>
                      <i className="iconfont">&#xe63d;</i>
                    </span>
                  </li>
                )
              })}
            </ListContainer>
          </ScrollWrapper>
        </div>
        <Confirm ref={confirmRef} {...confirmProps}/>
      </PlayListWrapper>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => {
  return {
    playListData: state.getIn(['player', 'playList']),
    showPlayList: state.getIn(['player', 'showPlayList']),
    mode: state.getIn(['player', 'mode']),
    currentIndex: state.getIn(['player', 'currentIndex']),
    sequencePlayList: state.getIn(['player', 'sequencePlayList']),
    currentSong: state.getIn(['player', 'currentSong']),
    playing: state.getIn(['player', 'playing']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data))
    },
    changeCurrentIndexDispatch(index) {
      dispatch(changeCurrentIndex(index))
    },
    changeCurrentDispatch(data) {
      dispatch(changeCurrentSong(data))
    },
    changeModeDispatch(data) {
      // 修改播放模式
      dispatch(changePlayMode(data))
    },
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data))
    },
    deleteSongDispatch(data) {
      dispatch(deleteSong(data))
    },
    clearSongsDispatch() {
      dispatch(clearSongs())
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PlayList))
