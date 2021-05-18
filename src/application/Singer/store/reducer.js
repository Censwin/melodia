import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const initState = fromJS({
  artist: {},
  songsOfArtist: [],
  loading: true
})

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER:
      return state.set('artist', action.data)
    case actionTypes.CHANGE_SONGS_OF_SINGER:
      return state.set('songsOfArtist', action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('loading', action.loading)
    default:
      return state
  }
}