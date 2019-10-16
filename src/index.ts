import {} from './js/Component/Header/Header.js';
import {} from './js/Component/Hero/Hero.js';
import {} from './js/Component/Teaser/Teaser.js';
import {} from './js/Component/ProgressiveImage/ProgressiveImage.js';

import { configureStore } from './js/API/Store/Store.js';
import { requestPost, requestPosts } from './js/API/Post/Action/Post.js';
const store = configureStore({});
store.dispatch(requestPost(1));
store.dispatch(requestPost(14));
store.dispatch(requestPost(44));
store.dispatch(requestPosts({ 'order': 'desc', beta:1 }));


import {} from './js/Util/WebComponent/HelloWorld.native.js';
import {} from './js/Util/WebComponent/HelloWorld.template.js';
import {} from './js/Util/WebComponent/HelloWorld.lithtml.js';
import {} from './js/Util/WebComponent/HelloWorld.typescript.js';
