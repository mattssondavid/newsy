import { combineReducers } from '../Redux/Redux.js';

import { postReducer } from '../Post/Reducer/Post.mjs';

const rootReducer = combineReducers({
    postReducer,
});

export default rootReducer;
