import { RECEIVE_POST } from '../Action/Post.mjs';

const initPostState = {};

export function postReducer(state = initPostState, action) {
    switch (action.type) {
        case RECEIVE_POST:
            return Object.assign({}, state, action.payload);

        default: return state;
    }
};
