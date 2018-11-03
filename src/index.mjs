import Header from './js/Component/Header/Header.mjs';
import Hero from './js/Component/Hero/Hero.mjs';
import Teaser from './js/Component/Teaser/Teaser.mjs';
import ProgressiveImage from './js/Component/ProgressiveImage/ProgressiveImage.mjs';

import { configureStore } from './js/API/Store/Store.js';
import { requestPost } from './js/API/Post/Action/Post.mjs';
const store = configureStore({});
store.dispatch(requestPost(1));
