export const FETCH_REQUEST = '[API] Fetch Request';

/**
 * @param {String} method Fetch method
 * @param {String} url Fetch URL
 * @param {String} body Fetch payload
 * @param {String} onSuccess On successful Action type
 * @param {String} onError On failure Action type
 *
 * @returns {Object} A Fetch action
 */
export const fetchRequest = (method, url, body, onSuccess, onError) => ({
    meta: {
        method,
        onError,
        onSuccess,
        url
    },
    payload: body,
    type: FETCH_REQUEST
});
