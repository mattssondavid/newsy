import {
    REQUEST_POST,
    RECEIVE_POST,
    REQUEST_POST_ERROR
} from '../Action/Post.mjs';

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

        case REQUEST_POST_ERROR:
            return {
                ...state,
                isFetching: false,
                error: {
                    status: action.payload.name,
                    message: action.payload.message
                }
            }

        default: return state;
    }
};
