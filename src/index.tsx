import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import './index.scss'
import App from './pages/'
import Contact from './pages/contacts'
import Meeting from './pages/meetings'
import User from './pages/users'
import reportWebVitals from './reportWebVitals'
import store from 'modules/index'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/meetings">
          <Meeting />
        </Route>
        <Route exact path="/contacts/:id">
          <Contact />
        </Route>
        <Route exact path="/users">
          <User />
        </Route>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
