import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classes from './style.scss'
import { fetchStream } from '../../modules/actions'

const AddKeyword = ({ dispatch }) => {
  let input

  return (
    <div className={classes.wrapper}>
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
