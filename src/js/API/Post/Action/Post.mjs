export const REQUEST_POST = '[Post] Request post';

export const RECEIVE_POST = '[Post] Receive post';

export const REQUEST_POST_ERROR = '[Post] Request error';

export const requestPost = postID => ({
    id: postID,
    type: REQUEST_POST
});
