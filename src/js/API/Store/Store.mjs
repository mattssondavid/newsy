import {
    applyMiddleware,
    createStore,
    compose,
    combineReducers
} from '../../../../node_modules/redux/es/redux.mjs';

import rootReducers from './Reducer.mjs';
import rootMiddlewares from './Middleware.mjs';

// eslint-disable-next-line no-underscore-dangle
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const configureStore = preloadedState => createStore(
    combineReducers(rootReducers),
    preloadedState,
    devCompose(applyMiddleware(...rootMiddlewares))
);
