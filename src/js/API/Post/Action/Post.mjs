export const REQUEST_POST = '[Post] Request post';

export const RECEIVE_POST = '[Post] Receive post';

export const REQUEST_POST_ERROR = '[Post] Request error';

export const requestPost = (postID) => ({
    type: REQUEST_POST,
    id: postID
});

export const receivePost = (json) => ({
    type: RECEIVE_POST,
    id: json.id,
    payload: json
});
