import React, { Component } from 'react'
import { connect } from 'react-redux'
import Stream from '../../components/Stream'
import { removeStream } from '../../modules/actions'
import classes from './style.scss'

class Streams extends Component {
  render () {
    const { streams, removeStream } = this.props
    const keywords = Object.keys(streams)

    if (keywords && keywords.length) {
      return (
        <ul className={classes['streams-wrapper']}>
          {keywords.map((keyword) => {
            return (
              <li key={keyword}>
                <Stream
                  keyword={keyword}
                  tweets={streams[keyword].tweets}
                  loading={streams[keyword].loading || false}
                  removeStream={removeStream}/>
              </li>
            )
          })}
        </ul>
      )
    } else {
      return (
        <div className={classes['streams-wrapper'] + ' ' + classes['no-streams']}>
          No streams are added
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    streams: state.tweetStreamByKeywords
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeStream: (keyword) => {
      dispatch(removeStream(keyword))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Streams)
