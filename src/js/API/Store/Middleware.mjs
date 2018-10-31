import { api } from '../Fetch/Middleware/Fetch.mjs';
import { postMiddleware } from '../Post/Middleware/Post.mjs';

const middlewares = [
    postMiddleware,
    api
];

export default middlewares;
