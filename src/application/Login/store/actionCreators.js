import {
  loginRequest,
  logoutRequest
} from "../../../api/request";
import {CHANGE_LOGIN_STATUS, CHANGE_USER_INFO} from './constant'
import { fromJS } from 'immutable';
const changeLoginStatus = (data) => {
  return {
    type: CHANGE_LOGIN_STATUS,
    data
  }
}

const changeUserInfo = (data) => {
  return {
    type: CHANGE_USER_INFO,
    data: fromJS(data)
  }
}

export const handleLogin = (params) => {
  return (dispatch) => {
    loginRequest(params).then(res => {
      if (res.code === 200) {
        const userInfo = {...res.profile, userId: res.account.id}
        dispatch(changeLoginStatus(true))
        dispatch(changeUserInfo(userInfo))
      }
    })
  }
}

export const handleLogout = () => {
  return (dispatch) => {
    logoutRequest().then(res => {
      if (res.code === 200) {
        dispatch(changeLoginStatus(false))
        dispatch(changeUserInfo({}))
      }
    })
  }
}