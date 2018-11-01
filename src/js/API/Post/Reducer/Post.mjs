import { REQUEST_POST, RECEIVE_POST } from '../Action/Post.mjs';

const initPostState = {};

export function postReducer(state = initPostState, action) {
    switch (action.type) {
        case RECEIVE_POST:
            return {
                ...state,
                ...action.payload,
                isFetching: false,
            };

        case REQUEST_POST:
            return {
                ...state,
                ...action.payload,
                isFetching: true,
            };

        default: return state;
    }
};
