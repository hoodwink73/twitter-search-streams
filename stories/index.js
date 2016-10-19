import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Stream from '../src/routes/TwitterSearchStream/components/Stream'

import tweets from './mockData/tweets'

storiesOf('Tweet Stream', module)
  .add('with no tweets', () => (
    <Stream tweets={[]} count={0} keyword={"redux"} />
  ))

storiesOf('Tweet Stream', module)
  .add('loading initial tweets', () => (
    <Stream tweets={[]} count={0} loading={true} keyword={"redux"} />
  ))

storiesOf('Tweet Stream', module)
  .add('with tweets', () => (
    <Stream tweets={[tweets[0], tweets[1]]} keyword={"redux"} />
  ))

storiesOf('Tweet Stream', module)
  .add('with tweets and pagination enabled', () => (
    <Stream tweets={[tweets[0], tweets[1]]} count={1} keyword={"redux"} />
  ))

  storiesOf('Tweet Stream', module)
    .add('loading tweets from next page', () => (
      <Stream tweets={[tweets[0], tweets[1], tweets[2]]} count={1} keyword={"redux"} loading={true}/>
    ))
