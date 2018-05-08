import WPRestHome from '../Util/WPRestHome.mjs';

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
