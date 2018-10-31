import { FETCH_REQUEST } from '../Action/Fetch.mjs';

export const api = store => next => action => {
    if (action.type === FETCH_REQUEST) {
        const { method, url, onSuccess, onError } = action.meta;
        fetch(
            url,
            {
                method,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            }
        )
        .then(response => {
            const contentType = response.headers.get('content-type');
            if ((contentType + "").includes('application/json')) {
                return response;
            }
            throw new TypeError('Wrong type');
        })
        .then(response => response.json())
        .then(json => store.dispatch({type: onSuccess, payload: json}))
        .catch(error => store.dispatch({type: onError, payload: error}));
    }
    return next(action);
};
