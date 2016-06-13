import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import firebaseConfig from '../../.firebaseauth.json'

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    routerKey: PropTypes.number,
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    firebase.initializeApp(firebaseConfig)
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
