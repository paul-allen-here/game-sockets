import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducer'
import gameMiddleware from './gameMiddleware'

import './style.scss';

const root = document.getElementById('root')

const store = createStore(reducer, applyMiddleware(gameMiddleware));

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
root )