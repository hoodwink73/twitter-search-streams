import {
  RECEIVE_STREAM,
  REQUEST_STREAM,
  REMOVE_STREAM
} from './actions'

import _ from 'lodash'

// the initial state is bootstrapped from dummy data
function tweetStreamByKeywords (state = {}, action) {
  if (action.type === RECEIVE_STREAM) {
    return Object.assign({}, state, {
      [action.keyword]: {
        tweets: action.tweets,
        lastUpdatedAt: Date.now(),
        loading: false
      }
    })
  } else if (action.type === REQUEST_STREAM) {
    return Object.assign({}, state, {
      [action.keyword]: {
        loading: true
      }
    })
  } else if (action.type === REMOVE_STREAM) {
    return _.omit(state, [action.keyword])
  }

  return state
}

export { tweetStreamByKeywords }
