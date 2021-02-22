import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducers from './redux/reducers'
import { BrowserRouter } from 'react-router-dom'


const store = createStore(Reducers)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));

reportWebVitals();
