import WPRestHome from '../Util/WPRestHome.js';

export const getImage = (id) => fetch(`${WPRestHome}wp/v2/media/${id}`)
    .then(response => {
        if (String(response.headers.get('content-type')).includes('application/json'))
            return response;
        throw new TypeError('Wrong type');
    })
    .then(response => response.json());
