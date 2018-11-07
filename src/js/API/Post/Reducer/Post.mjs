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
                isFetching: false
            };

        case REQUEST_POST:
            return {
                ...state,
                ...action.payload,
                isFetching: true
            };

        case REQUEST_POST_ERROR:
            return {
                ...state,
                error: {
                    message: action.payload.message,
                    status: action.payload.name
                },
                isFetching: false
            };

        default: return state;
    }
}
