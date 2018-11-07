import { api } from '../Fetch/Middleware/Fetch.mjs';
import { postMiddleware } from '../Post/Middleware/Post.mjs';
import { logToConsole } from '../Log/Middleware/Log.mjs';

const middlewares = [
    ...postMiddleware,
    api,
    logToConsole
];
export default middlewares;
