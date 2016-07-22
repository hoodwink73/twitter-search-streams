import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { entities, pagination } from '../routes/TwitterSearchStream/modules/reducers.js'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    entities,
    pagination,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
