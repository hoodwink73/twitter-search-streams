import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import twitterAuthKeys from '../../.twitterAuth.json'

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    routerKey: PropTypes.number,
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    // const T = new Twit({...twitterAuthKeys})
    // T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
    //   console.log(data, response)
    // })
  }

  render () {
    const { history, routes, routerKey, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} key={routerKey} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
