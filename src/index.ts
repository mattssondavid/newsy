import './js/Component/Header/Header.js';
import './js/Component/Hero/Hero.js';
import './js/Component/Teaser/Teaser.js';
import './js/Component/ProgressiveImage/ProgressiveImage.js';

import { configureStore } from './js/API/Store/Store.js';
import { requestPost, requestPosts } from './js/API/Post/Action/Post.js';
const store = configureStore({});
store.dispatch(requestPost(1));
store.dispatch(requestPost(14));
store.dispatch(requestPost(44));
store.dispatch(requestPosts({ 'order': 'desc', beta:1 }));


import './js/Util/WebComponent/HelloWorld.native.js';
import './js/Util/WebComponent/HelloWorld.template.js';
import './js/Util/WebComponent/HelloWorld.lithtml.js';
import './js/Util/WebComponent/HelloWorld.typescript.js';
