import WPRestHome from '../Util/WPRestHome.js';

export function getPosts() {
    const path = 'wp/v2/posts';
    if (WPRestHome === undefined) {
        return undefined;
    }

    return fetch(WPRestHome + path)
        .then(response => {
            const contentType = response.headers.get('content-type');
            if ((contentType + "").includes('application/json')) {
                return response;
            }
            throw new TypeError('Wrong type');
        })
        .then(response => response.json());
};

export const getPost = (id) => fetch(`${WPRestHome}wp/v2/posts/${id}`)
    .then(response => {
        if (String(response.headers.get('content-type')).includes('application/json'))
            return response;
        throw new TypeError('Wrong type');
    })
    .then(response => response.json());
