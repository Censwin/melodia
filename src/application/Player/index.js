import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen,
} from './store/actionCreators'
import MiniPlayer from './miniPlayer'
import NormalPlayer from './normalPlayer'
import { getSongUrl, isEmptyObject, shuffle } from '../../api/utils'
import Toast from '../../baseUI/Toast'
function Player(props) {
  const {
    fullScreen,
    playing,
    currentIndex,
    currentSong: immutableCurrentSong,
    playList: immutablePlaylist,
    mode, // 播放模式
    sequencePlayList: immutableSequencePlayList
  } = props
  const {
    toggleFullScreenDispatch,
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changeModeDispatch, // 修改播放模式
    changePlayListDispatch, // 修改播放列表
  } = props
  let currentSong = immutableCurrentSong.toJS()
  let playList = immutablePlaylist.toJS()
  let sequencePlayList = immutableSequencePlayList.toJS()
  //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState({})
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0)
  //歌曲总时长
  const [duration, setDuration] = useState(0)
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  // Toast 弹窗提示
  const [modeText, setModeText] = useState('')
  const toastRef = useRef(); // 访问Toast组件ref

  const clickPlaying = (e, state) => {
    e.stopPropagation()
    togglePlayingDispatch(state)
  }

  const audioRef = useRef()

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    ) {
      return
    }
    // if(!currentSong) return;
    let current = playList[currentIndex];
    changeCurrentDispatch(current); //赋值currentSong
    setPreSong(current);
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play()
    });
    togglePlayingDispatch(true); //播放状态
    setCurrentTime(0); //从头开始播放
    setDuration((current.dt / 1000) | 0); //时长
  }, [currentIndex])
  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing])
  // useEffect(() => { // 当前歌曲播完自动播放下一首
  //   if (percent >= 1) {
  //     nextSong()
  //   }
  // }, [percent])
  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime)
  }
  const onProgressChange = (curPercent) => {
    const newTime = curPercent * duration
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
    if (!playing) {
      togglePlayingDispatch(true)
    }
  }
  const resetTime = () => {
    audioRef.current.currentTime = 0
    togglePlayingDispatch(true)
    audioRef.current.play()
  }
  const lastSong = () => {
    if (playList.length === 1) {
      resetTime()
      return
    }
    const index = currentIndex < 1 ? 0 : currentIndex - 1
    const item = playList[index]
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
    changeCurrentDispatch(item)
  }
  const nextSong = () => {
    if (playList.length === 1) {
      resetTime()
      return
    }
    const index =
      currentIndex < playList.length - 1 ? currentIndex + 1 : currentIndex
    const item = playList[index]
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
    changeCurrentDispatch(item)
  }
  // 修改播放模式回调
  const changeMode = () => {
    // const _mode = mode === 2 ? 0 : mode + 1;
    // const _mode = mode + 1 === 3 ? 0 : mode + 1;
    const _mode = (mode + 1) % 3
    switch (_mode) {
      // 原来case并不会生成块作用域
      case 0: // 顺序播放
        changePlayListDispatch(sequencePlayList)
        setModeText('顺序播放')
        break;
      case 1: 
        const newList = playList.filter((item, index) => index === currentIndex)
        changePlayListDispatch(newList)
        setModeText('单曲循环')
        break; 
      case 2:
        const newList2 = shuffle(sequencePlayList)
        changePlayListDispatch(newList2)
        setModeText('随机播放')
        break;
      default:
        setModeText('切换失败')
        throw new Error('模式切换失败')
    }
    changeModeDispatch(_mode);
    toastRef.current.show();
  }
  return (
    <div>
      {!isEmptyObject(currentSong) && (
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          playing={playing}
          clickPlaying={clickPlaying}
          percent={percent}
          nextSong={nextSong}
        />
      )}
      {!isEmptyObject(currentSong) && (
        <NormalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          duration={duration} //总时长
          currentTime={currentTime} //播放时间
          percent={percent} //进度
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
          lastSong={lastSong}
          nextSong={nextSong}
          mode={mode}
          changeMode={changeMode}
        />
      )}
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={nextSong}></audio>
      <Toast text={modeText} ref={toastRef}/>
    </div>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentSong: state.getIn(['player', 'currentSong']),
  showPlayList: state.getIn(['player', 'showPlayList']),
  mode: state.getIn(['player', 'mode']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
})

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data))
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFullScreen(data))
    },
    togglePlayListDispatch(data) { // 是否显示播放列表
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
    changePlayListDispatch(data) { // 修改播放列表
      dispatch(changePlayList(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
