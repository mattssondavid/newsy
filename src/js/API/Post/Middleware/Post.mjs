import { REQUEST_POST, RECEIVE_POST, REQUEST_POST_ERROR } from '../Action/Post.mjs';
import { fetchRequest } from '../../Fetch/Action/Fetch.mjs';
import WPRestHome from '../../../Util/WPRestHome.mjs';

export const getPost = store => next => action => {
    if (action.type === REQUEST_POST) {
        const postId = action.id;
        const url = `${WPRestHome}wp/v2/posts/${postId}`;
        store.dispatch(
            fetchRequest(
                'GET',
                url,
                null,
                RECEIVE_POST,
                REQUEST_POST_ERROR
            )
        );
    }

    return next(action);
};

export const postMiddleware = [
    getPost
];
