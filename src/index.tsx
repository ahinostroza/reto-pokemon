import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import reportWebVitals from './reportWebVitals'

import './index.css'
import createStore, { sagas } from './store'
import { sagaMiddleware } from './store/index'
import { Router } from './config/router'

const store = createStore()
sagaMiddleware.run(sagas)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
