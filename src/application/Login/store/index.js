import {fromJS} from 'immutable';
import {CHANGE_LOGIN_STATUS,CHANGE_USER_INFO} from './constant'


const defaultState = fromJS({
  loginStatus: false,
  userInfo: {}
})

export const reducer = (state=defaultState, action) => {
  switch (action.type) {
    case CHANGE_LOGIN_STATUS:
      return state.set('loginStatus', action.data);
    case CHANGE_USER_INFO:
      return state.set('userInfo', action.data)
    default: return state
  }
}