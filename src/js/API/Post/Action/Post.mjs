export const REQUEST_POST = '[Post] Request post';

export const RECEIVE_POST = '[Post] Receive post';

export const REQUEST_POST_ERROR = '[Post] Request error';

/**
 * @param {Number} postID The WordPress post ID
 *
 * @returns {Object} A request post action
 */
export const requestPost = postID => ({
    id: postID,
    type: REQUEST_POST
});
