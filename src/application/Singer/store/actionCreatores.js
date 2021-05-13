import * as actionTypes from './constants';
import {formJS, fromJS} from 'immutable';
import {getSingerInfoRequest} from '../../../api/request';

const changeArtist = (data) => {
  return {
    type: actionTypes.CHANGE_SINGER,
    data: fromJS(data)
  }
}

const changeSongs = (list) => {
  return {
    type: actionTypes.CHANGE_SONGS_OF_SINGER,
    data: fromJS(list)
  }
}

const changeEnterLoading = (loading) => {
  return {
    type: actionTypes.CHANGE_ENTER_LOADING,
    loading
  }
}

export const getSingerInfo = (id) => {
  return (dispatch) => {
    
  }
}