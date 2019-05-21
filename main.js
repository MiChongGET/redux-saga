import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)

//启动saga
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

function render() {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrementAsync={()=> action(('INCREMENT_ASYNC'))}
            onIncrement={() => action('INCREMENT')}
            onDecrement={() => action('DECREMENT')}
            getNet={()=>action('FETCH_REQUESTED')}/>,
        document.getElementById('root')
    )
}

render()
store.subscribe(render)
