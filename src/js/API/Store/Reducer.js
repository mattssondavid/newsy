import { combineReducers } from 'redux';

import { postReducer } from '../Post/Reducer/Post.mjs';

const rootReducer = combineReducers({
    postReducer,
});

export default rootReducer;
