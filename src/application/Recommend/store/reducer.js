/*
 * @Author: your name
 * @Date: 2021-04-07 17:10:35
 * @LastEditTime: 2021-04-08 15:07:26
 * @LastEditors: Please set LastEditors
 * @Description: 存放 initialState 和 reducer 函数
 * @FilePath: \melodia\src\application\Recommend\store\reducer.js
 */
import * as actionTypes from './constans';
import {fromJS} from 'immutable'; // 使用 fromJS 把 JS 数据结构转化为 immutable 结构

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  isLoading: true
})


export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER: 
      return state.set('bannerList', action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data)
    case actionTypes.CHANGE_LOADING_STATUS:
      return state.set('isLoading', action.data)
    default:
      return state;
  }
}