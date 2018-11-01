import { combineReducers } from '../Redux/Redux.js';

import { postReducer as post } from '../Post/Reducer/Post.mjs';

const rootReducer = combineReducers({
    post,
});

export default rootReducer;
