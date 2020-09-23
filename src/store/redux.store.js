import { applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {allReducers} from '../reducers'

const middleware = applyMiddleware(thunk);

export function configureStore(){
    const store = createStore(allReducers, middleware);
    return store;
}