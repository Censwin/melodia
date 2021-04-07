import * as actionTypes from './constans';
import {fromJS} from 'immutable';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS (data)
})

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
})

export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest().then(res => {
      dispatch(changeBannerList(res.banners))
    }).catch(_ => console.log('数据错误'))
  }
}

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then(res => {
      dispatch(changeRecommendList(res.result))
    }).catch(_ => console.log('推荐歌单数据错误'))
  }
}
