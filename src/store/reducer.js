import { combineReducers } from 'redux-immutable';
//其中 redux-immutable 大家可能比较陌生，因为项目中需要用到 immutable.js 中的数据结构，
//所以合并不同模块 reducer 的时候需要用到 redux-immutable 中的方法。
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';
import { reducer as rankReducer } from '../application/Rank/store/index';
import { reducer as albumReducer } from '../application/Album/store/index';
import { reducer as singerInfoReducer } from '../application/Singer/store/index'
import { reducer as playerReducer } from '../application/Player/store/index'

export default combineReducers({
  // 之后开发具体功能模块的时候添加reducer
  recommend: recommendReducer,
  singers: singersReducer ,
  rank: rankReducer,
  albumDetail: albumReducer,
  singerInfoReducer,
  player: playerReducer
});