import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './style.scss'
import { fetchStream } from '../../modules/actions'
import auth from 'firebase/auth'

const AddKeyword = ({ dispatch }) => {
  let input
  const authenticateWithTwitterHandler = (event) => {
    const twitterAuthProvider = new auth.TwitterAuthProvider()
    auth().signInWithPopup(twitterAuthProvider).then(function (result) {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
      console.log(result)
    // ...
    }).catch(function (error) {
      // ...
    })
  }
  return (
    <div className={classes.wrapper}>
      <a href='#' onClick={authenticateWithTwitterHandler}> Sign in with Twitter </a>
      <input
        className='add-keyword'
        type='text'
        ref={function (node) {
          input = node
        }}
      />
      <button
        className='add-keyword'
        onClick={function (event) {
          const keyword = input.value
          dispatch(fetchStream(keyword))
          input.value = ''
        }}
      >
        Add Keyword
      </button>
    </div>
  )
}

AddKeyword.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(AddKeyword)
