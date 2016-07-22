import {
  ADD_STREAM,
  RECEIVE_STREAM,
  REQUEST_STREAM,
  REMOVE_STREAM
} from './actions'

import _ from 'lodash'

function entities (state = { tweets: {} }, action) {
  if (action.payload && action.payload.response && action.payload.response.entities) {
    return _.merge({}, state, action.payload.response.entities)
  } else {
    return state
  }
}

function updatePaginationForStream (state = {
  tweets: [],
  count: 0,
  loading: false,
  nextPageUrl: undefined
}, action) {
  if (action.type === ADD_STREAM) {
    return Object.assign({}, state, {
      id: action.payload.keyword
    })
  } else if (action.type === REQUEST_STREAM) {
    return _.merge({}, state, {
      loading: true
    })
  } else if (action.type === RECEIVE_STREAM) {
    return _.merge({}, state, {
      id: action.payload.keyword,
      tweets: _.union(state.tweets, action.payload.response.result),
      nextPageUrl: action.payload.nextPageUrl,
      loading: false,
      count: state.count + 1
    })
  }
}

function pagination (state = {}, action) {
  const keyword = action.payload && action.payload.keyword
  switch (action.type) {
    case ADD_STREAM:
    case REQUEST_STREAM:
    case RECEIVE_STREAM:
      return _.merge({}, state, {
        [keyword]: updatePaginationForStream(state[keyword], action)
      })
    case REMOVE_STREAM:
      return _.omit(state, [keyword])
  }

  return state
}

export { entities, pagination }
