import { fromJS } from 'immutable'
import { playMode } from '../../../api/config'
import { findIndex } from '../../../api/utils'
import * as actionTypes from './constants'
const handleDeleteSong = (state, item) => {
  const playList = state.get('playList')
  const sequencePlayList = state.get('sequencePlayList')
  let currentIndex = state.get('currentIndex')
  const index = findIndex(item, playList.toJS())
  const index2 = findIndex(item, sequencePlayList.toJS())
  const newPlayList = playList.filter((_, i) => i != index)
  const newSequence = sequencePlayList.filter((_, i) => i != index2)
  if (index < currentIndex) currentIndex--
  return state
    .set('playList', fromJS(newPlayList))
    .set('sequencePlayList', fromJS(newSequence))
    .set('currentIndex', currentIndex)
}
const handleClearSongs = (state) => {
  return state
    .set('playList', fromJS([]))
    .set('sequencePlayList', fromJS({}))
    .set('currentIndex', -1)
    .set('showPlayList', false)
    .set('currentSong', fromJS({}))
    .set('playing', false)
}

const defaultState = fromJS({
  fullScreen: false, // 播放器是不是全屏状态
  playing: false, // 是否正在播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [],
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {},
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return state.set('currentSong', action.data)
    case actionTypes.SET_FULL_SCREEN:
      return state.set('fullScreen', action.data)
    case actionTypes.SET_PLAYING_STATE:
      return state.set('playing', action.data)
    case actionTypes.SET_SEQUENCE_PLAYLIST:
      return state.set('sequencePlayList', action.data)
    case actionTypes.SET_PLAYLIST:
      return state.set('playList', action.data)
    case actionTypes.SET_PLAY_MODE:
      return state.set('mode', action.data)
    case actionTypes.SET_CURRENT_INDEX:
      return state.set('currentIndex', action.data)
    case actionTypes.SET_SHOW_PLAYLIST:
      return state.set('showPlayList', action.data)
    case actionTypes.DELETE_SONG:
      return handleDeleteSong(state, action.data)
    case actionTypes.CLEAR_SONGS:
      return handleClearSongs(state)
    default:
      return state
  }
}
