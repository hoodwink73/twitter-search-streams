import { CALL_API } from 'redux-api-middleware'
import { Schema, arrayOf, normalize } from 'normalizr'

export const ADD_STREAM = 'ADD_STREAM'
export const REQUEST_STREAM = 'REQUEST_STREAM'
export const RECEIVE_STREAM = 'RECEIVE_STREAM'
export const FAILED_STREAM = 'FAILED_STREAM'
export const REMOVE_STREAM = 'REMOVE_STREAM'

const twitterStreamAPI = (keyword) => `/api/search/${keyword}`

// get the search query from response from twitter
// search api
const getKeywordfromResponse = (response) => {
  return response.search_metadata.query
}

const tweetSchema = new Schema('tweets', {
  'idAttribute': 'id_str'
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

const getNextPageUrl = function (response) {
  return response.search_metadata.refresh_url
}

export function fetchStream (keyword, doFetchNextPage) {
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
            return {
              keyword: getKeywordfromResponse(response),
              response: normalize(response.statuses, arrayOf(tweetSchema)),
              nextPageUrl: getNextPageUrl(response)
            }
          })
        }
      },
        FAILED_STREAM
      ],
      endpoint (state) {
        if (doFetchNextPage) {
          return twitterStreamAPI(keyword) + state.pagination[keyword].nextPageUrl
        } else {
          return twitterStreamAPI(keyword)
        }
      },
      bailout (state) {
        // if no new page is requested and
        // the keyword already exists in the stream
        // don't proceed
        if (!doFetchNextPage && state.pagination.keyword) {
          return true
        }
      },
      method: 'GET'
    }
  }
}

export function fetchStreamNextPage (keyword) {
  return fetchStream(keyword, true)
}
