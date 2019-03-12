import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
// import connect from '@vkontakte/vkui-connect';
import connect from './vk-connect/index';
import App from './App';
import registerServiceWorker from './sw';

// Init VK App
connect.send('VKWebAppInit', {})
	.then(data => console.log(data));

// Service Worker For Cache
registerServiceWorker();

ReactDOM.render(<App />, document.getElementById('root'));
