import {
    applyMiddleware,
    createStore,
    compose,
    combineReducers
} from '../../../node_modules/redux/es/redux.mjs';

import rootReducers from './Reducer.js';
import rootMiddlewares from './Middleware.mjs';

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = preloadedState => createStore(
    combineReducers(rootReducers),
    preloadedState,
    devCompose(applyMiddleware(...rootMiddlewares))
);
