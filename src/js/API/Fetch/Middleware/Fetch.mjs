import { FETCH_REQUEST } from '../Action/Fetch.mjs';

export const api = store => next => action => {
    if (action.type === FETCH_REQUEST) {
        const { method, url, onSuccess, onError } = action.meta;
        fetch(
            url,
            {
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                method
            }
        )
            .then(response => {
                const contentType = response.headers.get('content-type');
                if (String(contentType).includes('application/json')) {
                    return response;
                }
                throw new TypeError('Wrong type');
            })
            .then(response => {
                if (response.status >= 400) {
                    const error = new Error(response.statusText);
                    error.name = response.status;
                    throw error;
                }

                return response;
            })
            .then(response => response.json())
            .then(json => store.dispatch(
                {
                    payload: json,
                    type: onSuccess
                }
            ))
            .catch(error => store.dispatch(
                {
                    payload: error,
                    type: onError
                }
            ));
    }

    return next(action);
};
