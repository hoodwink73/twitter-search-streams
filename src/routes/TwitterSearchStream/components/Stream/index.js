import React from 'react'
import Tweet from '../Tweet/'
import classes from './style.scss'

export default function (props) {
  const {keyword, tweets, loading, removeStream} = props
  let TweetsWrapper
  if (loading) {
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
