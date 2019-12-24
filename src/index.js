import './stylesheet/_common.css'
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom';
import rootReducers from './rootReducer'
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import testMiddleware from './middlewares/testMiddleware'


const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(testMiddleware, thunk)
    )
)




ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    </LocaleProvider>,
    document.getElementById('root')
);

