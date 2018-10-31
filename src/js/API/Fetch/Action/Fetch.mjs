export const FETCH_REQUEST = '[API] Fetch Request';

/**
 *
 * @param method
 * @param url
 * @param body
 * @param onSuccess {String} On successful Action type
 * @param onError {String} On failure Action type
 */
export const fetchRequest = (method, url, body, onSuccess, onError) => ({
    type: FETCH_REQUEST,
    payload: body,
    meta: {
        method,
        url,
        onSuccess,
        onError
    }
});
