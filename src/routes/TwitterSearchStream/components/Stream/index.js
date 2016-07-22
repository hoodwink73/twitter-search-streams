import React from 'react'
import Tweet from '../Tweet/'
import classes from './style.scss'

export default function (props) {
  const {keyword, tweets, loading, count, fetchStreamNextPage, removeStream} = props
  let TweetsWrapper, loadMore

  const loadNextPage = (e) => {
    fetchStreamNextPage(keyword)
    e.preventDefault()
  }

  if (count > 0) {
    let loadingText
    if (loading) {
      loadingText = '...'
    } else {
      loadingText = 'Load More'
    }
    loadMore = <span className={classes['load-more']} onClick={loadNextPage}> {loadingText} </span>
  } else {
    loadMore = ''
  }

  if (loading && !count) {
    TweetsWrapper = <div>Loading</div>
  } else {
    TweetsWrapper = (
      <ul className={classes['tweets-wrapper']}>
        {tweets.map((tweet) => {
          return (
            <li className={classes['tweet-wrapper']} key={tweet.id}>
              <Tweet {...tweet} />
            </li>
          )
        })}
        {loadMore}
      </ul>
    )
  }

  return (
    <div className={classes['stream-wrapper']}>
      <header>
        <h2>{keyword}</h2>
        <span className={classes['remove-stream']}
          onClick={event => removeStream(keyword)}
        >
          Remove
        </span>
      </header>
      {TweetsWrapper}
    </div>
  )
}
