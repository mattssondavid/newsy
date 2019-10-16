import { api } from '../Fetch/Middleware/Fetch.js';
import { postMiddleware } from '../Post/Middleware/Post.js';
import { logToConsole } from '../Log/Middleware/Log.js';

const middlewares = [
    ...postMiddleware,
    api,
    logToConsole
];
export default middlewares;
