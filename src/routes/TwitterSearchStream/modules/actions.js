import { CALL_API } from 'redux-api-middleware'
import { Schema, arrayOf, normalize } from 'normalizr'

export const ADD_STREAM = 'ADD_STREAM'
export const REQUEST_STREAM = 'REQUEST_STREAM'
export const RECEIVE_STREAM = 'RECEIVE_STREAM'
export const FAILED_STREAM = 'FAILED_STREAM'
export const REMOVE_STREAM = 'REMOVE_STREAM'

const twitterStreamAPI = (keyword) => `/api/search/${keyword}`

const streamSchema = new Schema('streams', {
  idAttribute: function (rawAPI) {
    // rawAPI denotes exactly what twitter responds like
    return rawAPI.search_metadata.query
  },
  assignEntity (output, key, value, input) {
    // we delete search_metadata from stream
    if (key === 'search_metadata') {
      delete output.search_metadata
    } else if (key === 'statuses') {
      // rename 'statuses' key to 'tweets'
      // after making it a part of stream
      output.tweets = output.statuses
      delete output.statuses
    }
  }
})

const tweetSchema = new Schema('tweets', 'id_str')

streamSchema.define({
  tweets: arrayOf(tweetSchema)
})

export function addStream (keyword) {
  return {
    type: ADD_STREAM,
    payload: {
      keyword
    }
  }
}

export function removeStream (keyword) {
  return {
    type: REMOVE_STREAM,
    payload: {
      keyword
    }
  }
}

export function fetchStream (keyword) {
  return {
    [ CALL_API ]: {
      types: [{
        type: REQUEST_STREAM,
        payload: {keyword}
      },
      {
        type: RECEIVE_STREAM,
        payload: (action, state, response) => {
          return response.json().then(response => {
            console.log(normalize(response, streamSchema))
            return {
              keyword,
              tweets: response.statuses
            }
          })
        }
      },
        FAILED_STREAM
      ],
      endpoint: twitterStreamAPI(keyword),
      method: 'GET'
    }
  }
}
