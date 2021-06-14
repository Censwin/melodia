import React, { useState, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { PlayListWrapper, ScrollWrapper, ListContainer } from './style'
import { prefixStyle, getName } from './../../../api/utils'
import {
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayMode,
  changePlayList,
} from '../store/actionCreators'
import { playMode } from '../../../api/config'
import Scroll from '../../../baseUI/scroll'

function PlayList(props) {
  const {
    showPlayList,
    playListData: playListDataImmutable,
    currentIndex,
    mode,
    modeText
  } = props
  const { togglePlayListDispatch } = props
  const playListData = playListDataImmutable.toJS()
  const playListRef = useRef()
  const listWrapperRef = useRef()
  const [isShow, setIsShow] = useState(false)
  const getCurrentIcon = (index) => {
    if (currentIndex === index) {
      return <i className="iconfont playIcon" dangerouslySetInnerHTML={{ __html: '&#xe6e3;' }}></i>
    } else {
      return <i className="iconfont" style={{opacity: 0}}>&#xe6e3;</i>
    } 
  }
  const getPlayMode = () => {
    let content;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
    } else {
      content = "&#xe61b;";
    }
    return content;
  };
  const transform = prefixStyle("transform")
  const onEnterCB = useCallback(() => {
    setIsShow(true)
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform])
  const onEnteringCB =useCallback(() => {
    listWrapperRef.current.style["transition"] = `all .5s cubic-bezier(0.22, 0.61, 0.36, 1)`;
    listWrapperRef.current.style[transform] = `translate3d(0, 0, 0)`;
  },[transform]) 
  const onExitCB = useCallback(() => {
    listWrapperRef.current.style["transition"] = `all .5s cubic-bezier(0.22, 0.61, 0.36, 1)`;
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform])
  const onExitedCB = useCallback(()=> {
    setIsShow(false)
  }, [transform])

  // 业务逻辑开始
  
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
        onClick={() => togglePlayListDispatch(false)}
        style={{display: isShow ? 'block' : 'none'}}
      >
        <div className="list_wrapper" ref={listWrapperRef}>
          <ScrollWrapper>
            <ListContainer>
              <li className="controlBar">
                <i className="iconfont" dangerouslySetInnerHTML={{ __html: getPlayMode() }}></i>
              <span className="modetext">{modeText}</span>
              <span className="delete">
                <i className="iconfont">&#xe63d;</i>
              </span>
              </li>
              {playListData.map((item, index) => {
                return (
                  <li className="item" key={item.id}>
                    {getCurrentIcon(index)}
                    <span className="text" onClick={handleClickSong}>{`${item.name} - ${getName(item.ar)}`}</span>
                    <span className="like">
                      <i className="iconfont">&#xe601;</i>
                    </span>
                    <span className="delete">
                      <i className="iconfont">&#xe63d;</i>
                    </span>
                  </li>
                )
              })}
            </ListContainer>
          </ScrollWrapper>
        </div>
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
    changeModeDispatch(data) { // 修改播放模式
      dispatch(changePlayMode(data))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PlayList))
