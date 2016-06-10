import React from 'react'
import classes from './style.scss'

export default function (props) {
  const { text, user } = props
  const userHandle= user.screen_name
  const userName= user.name
  const userTwitterUrl = `https://twitter.com/${userName}`
  const userProfilePictureUrl = user.profile_image_url

  return (
    <div className={classes['tweet-box']}>
      <a href={userTwitterUrl}>
        <img className={classes['tweet-user-avatar']} src={userProfilePictureUrl} alt={userName} />
        <div className={classes['tweet-user-meta']}>
          <span className={classes['tweet-user-name']}>{userName}</span>
          <span className={classes['tweet-user-handle']}>{userHandle}</span>
        </div>
      </a>
      <div className={classes['tweet-text']}>
        {text}
      </div>
    </div>
  )
}
