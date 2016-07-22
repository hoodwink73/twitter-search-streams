import React, { Component } from 'react'
import { connect } from 'react-redux'
import Stream from '../../components/Stream'
import { fetchStream, fetchStreamNextPage, removeStream } from '../../modules/actions'
import classes from './style.scss'
import _ from 'lodash'

class Streams extends Component {
  componentWillReceiveProps (newProps) {
    const oldStreamKeywords = Object.keys(this.props.streams)
    const newStreamKeywords = Object.keys(newProps.streams)

    const newKeywords = _.difference(newStreamKeywords, oldStreamKeywords)
    for (let keyword of newKeywords) {
      newProps.fetchStream(keyword)
    }
  }

  render () {
    const { streams, removeStream, fetchStreamNextPage } = this.props
    const keywords = Object.keys(streams)

    if (keywords && keywords.length) {
      return (
        <ul className={classes['streams-wrapper']}>
          {keywords.map((keyword) => {
            const stream = streams[keyword]
            return (
              <li key={keyword}>
                <Stream {...stream} keyword={keyword} fetchStreamNextPage={fetchStreamNextPage} removeStream={removeStream} />
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
  const {
    entities,
    pagination
  } = state

  const keywords = Object.keys(pagination)
  const result = {}
  for (let keyword of keywords) {
    result[keyword] = Object.assign({}, pagination[keyword])
    result[keyword].tweets = pagination[keyword].tweets.map(function (tweetId) {
      return entities.tweets[tweetId]
    })
  }

  return {
    streams: result
  }
}

export default connect(mapStateToProps, {
  fetchStream,
  fetchStreamNextPage,
  removeStream
})(Streams)
