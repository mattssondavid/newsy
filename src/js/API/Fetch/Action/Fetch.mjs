export const FETCH_REQUEST = '[API] Fetch Request';

/**
 *
 * @param {string} method Fetch method
 * @param {string} url Fetch URL
 * @param {string} body Fetch payload
 * @param {string} onSuccess On successful Action type
 * @param {string} onError On failure Action type
 * @returns {undefined}
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
