import { REQUEST_POST, RECEIVE_POST, REQUEST_POST_ERROR } from '../Action/Post.mjs';
import { fetchRequest } from '../../Fetch/Action/Fetch.mjs';
import WPRestHome from '../../../Util/WPRestHome.mjs';

/**
 * @param {Redux} store A Redux store
 *
 * @returns {Object} A state resulting from calling the `next` function
 */
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

/**
 * Convert <img>-tag to <progressive-img>-tag
 * @param {String} text
 *
 * @return {String} Text with replaced tag(s)
 */
const replaceFoundImgTagsWithProgressiveImgTag = text => {
    const pattern = /<img([\W\w]*?)[/]?>/giu;

    return text.replace(pattern, '<progressive-img$1></progressive-img>');
};

/**
 * @returns {Object} A state resulting from calling the `next` function
 */
export const convertImgTagToProgressiveImgTag = () => next => action => {
    if (action.type === RECEIVE_POST) {
        if (!(
            action &&
            action.payload &&
            action.payload.content &&
            action.payload.excerpt)
        ) {
            return next(action);
        }

        const content = {
            ...action.payload.content,
            rendered: replaceFoundImgTagsWithProgressiveImgTag(action.payload.content.rendered)
        };

        const excerpt = {
            ...action.payload.excerpt,
            rendered: replaceFoundImgTagsWithProgressiveImgTag(action.payload.excerpt.rendered)
        };

        const payload = {
            ...action.payload,
            content,
            excerpt
        };

        return next({
            ...action,
            payload
        });
    }

    return next(action);
};

export const postMiddleware = [
    getPost,
    convertImgTagToProgressiveImgTag
];
