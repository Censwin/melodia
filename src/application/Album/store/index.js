import {fromJS} from 'immutable';
import { getAlbumDetailRequest } from '../../../api/request';

const CHANGE_ABLUM_DETAIL = 'album/changesongbill'
const CHANGE_ENTER_LOADING = 'album/CHANGE_ENTER_LOADING';

export const getAlbunDetail = (id) => {
  return dispatch => {
    getAlbumDetailRequest(id).then(res => {
      const list = res && res.playlist
      dispatch(changeAlbumDetail(list))
      dispatch(changeLoading(false))
    }, err => console.log(err))
  }
  
}

export const changeLoading = (state) => (
  {
    type: CHANGE_ENTER_LOADING,
    data: state
  }
)

// action
const changeAlbumDetail = (data) => (
  {
    type: CHANGE_ABLUM_DETAIL,
    data: fromJS(data)
  }
)

  

const defaleState = fromJS({
  currentAlbum: {},
  enterLoading: false,
})

const reducer = (state = defaleState, action) => {
  switch (action.type) {
    case CHANGE_ABLUM_DETAIL:
      return state.set('currentAlbum', action.data)
    case CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    default:
      return state
  }
}

export { reducer };