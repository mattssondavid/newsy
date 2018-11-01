import {applyMiddleware, createStore, compose} from '../Redux/Redux.js';

import rootReducer from './Reducer.js';
import rootMiddlewares from './Middleware.mjs';

export const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(...rootMiddlewares))
);
