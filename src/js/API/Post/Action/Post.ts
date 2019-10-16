export const REQUEST_POST = '[Post] Request post';

export const RECEIVE_POST = '[Post] Receive post';

export const REQUEST_POST_ERROR = '[Post] Request error';

export const REQUEST_POSTS = '[Posts] Request posts';

/**
 * @param {Number} postID The WordPress post ID
 *
 * @returns {Object} A request post action
 */
export const requestPost = postID => ({
    id: postID,
    type: REQUEST_POST
});

/**
 * @param {any} value
 *
 * @return {Boolean} True if is considered a string
 */
const isString = value => Object.prototype.toString.call(value) === '[object string]' ||
    typeof value === 'string';

/**
 *
 * @param {Object} [args={}] WP-Rest Post Arguments
 *
 * @returns {Object} A request posts action
 */
export const requestPosts = (args = {}) => {

    // {Object} -> {String}
    const restArgs = Object.entries(args)
        .filter(pair => {
            const [key, value] = pair;
            return isString(key) && isString(value);
        })
        .map(pair => {
            const [key, value] = pair;

            return `${key}=${value}`;
        })
        .reduce((accumulator, curentValue) => {
            return `${accumulator}&${curentValue}`;
        })
        .replace(/&$/,'');

    return {
        restArgs,
        type: REQUEST_POSTS
    };
};
