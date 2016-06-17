import fetch from 'isomorphic-fetch'

export const RECEIVE_STREAM = 'RECEIVE_STREAM'
export const REQUEST_STREAM = 'REQUEST_STREAM'
export const REMOVE_STREAM = 'REMOVE_STREAM'

const twitterStreamAPI = (keyword) => `/api/search/${keyword}`

function recieveStream (stream) {
  return {
    type: RECEIVE_STREAM,
    keyword: stream.keyword,
    tweets: stream.tweets
  }
}

function requestStream (keyword) {
  return {
    type: REQUEST_STREAM,
    keyword: keyword
  }
}

export function removeStream (keyword) {
  return {
    type: REMOVE_STREAM,
    keyword
  }
}

export function fetchStream (keyword) {
  return (dispatch, getState) => {
    // loading dummy data here
    dispatch(requestStream(keyword))
    fetch(twitterStreamAPI(keyword))
    .then(response => response.json())
    .then(json => dispatch(recieveStream({
      keyword,
      tweets: json.statuses
    })))
  }
}
