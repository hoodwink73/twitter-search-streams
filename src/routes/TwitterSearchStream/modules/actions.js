import { CALL_API } from 'redux-api-middleware'

export const ADD_STREAM = 'ADD_STREAM'
export const REQUEST_STREAM = 'REQUEST_STREAM'
export const RECEIVE_STREAM = 'RECEIVE_STREAM'
export const FAILED_STREAM = 'FAILED_STREAM'
export const REMOVE_STREAM = 'REMOVE_STREAM'

const twitterStreamAPI = (keyword) => `/api/search/${keyword}`

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
          return response.json().then(response => ({
            keyword,
            tweets: response.statuses
          }))
        }
      },
        FAILED_STREAM
      ],
      endpoint: twitterStreamAPI(keyword),
      method: 'GET'
    }
  }
}
