import {applyMiddleware, createStore, compose} from 'redux';

import rootReducer from './Reducer.js';
import rootMiddlewares from './Middleware.mjs';

export const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    compose(
        applyMiddleware(rootMiddlewares)
    )
);
