import React, { createContext, useReducer } from 'react'
import {fromJS} from 'immutable'
export const CategoryDataContext = createContext({})

export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY'
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA'

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set('_categ', action.data);
    case CHANGE_ALPHA:
      return state.set('_alpha', action.data);
    default:
      return state
  }
}

export const Data = props => {
  const [data, dispatch] = useReducer(reducer,fromJS({_categ: '', _alpha: ''}));
  return (
  <CategoryDataContext.Provider value={{data, dispatch}}>
    {props.children}
  </CategoryDataContext.Provider>
  )
}
