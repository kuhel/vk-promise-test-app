import React from 'react';
// import connect from '@vkontakte/vkui-connect';
import connect from './vk-connect';
import { View, Group, Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import './main.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			errors: [],
			other: [],
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			console.log(e.detail.type);
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				case 'VKWebAppGetPhoneNumberResult':
					this.setState({ phone: e.detail.data });
					break;
				case 'VKWebAppGetClientVersionResult':
					this.setState({ version: e.detail.data });
					break;
				case 'VKWebAppGetEmailResult':
					this.setState({ email: e.detail.data });
					break;
				case 'VKWebAppGetGeodataResult':
					this.setState({ geodata: e.detail.data });
					break;
				case 'VKWebAppAccessTokenReceived':
					this.setState({ access_token: e.detail.data.data.access_token });
					console.log('👋 Token — ', e.detail.data.data.access_token);
					connect.send('VKWebAppGetGeodata');
					connect.send("VKWebAppCallAPIMethod", {"method": "users.get", "request_id": "324nnefj", "params": {
						"user_ids": "1,2,3",
						"access_token": e.detail.data.data.access_token
					}});
					break;
				default:
					if (~e.detail.type.indexOf('Fail')) {
						this.setState((state) => ({
							errors: [ ...state.errors, e.detail.type]
						}));
					} else {
						this.setState((state) => ({
							other: [ ...state.other, e.detail.type]
						}));
					}
					console.log(e.detail.data);
			}
		});
		connect.send('VKWebAppSetLocation', {"location": "ololo"})
			.then(data => console.log(data));
		connect.send('VKWebAppGetEmail')
			.then(data => console.log(data));
		// connect.send('VKWebAppJoinGroup', {"group_id": 156817253});
		// connect.send('VKWebAppOpenPayForm',  {"amount":100,"data":"{\"amount\":100,\"currency\":\"RUB\",\"order_id\":251,\"cashback\":{\"pay_time\":1537282294,\"amount\":0.5},\"ts\":1537282294,\"merchant_data\":\"eyJhbW91bnQiOjEwMCwiY3VycmVuY3kiOiJSVUIiLCJvcmRlcl9pZCI6MjUxLCJjYXNoYmFjayI6eyJwYXlfdGltZSI6MTUzNzI4MjI5NCwiYW1vdW50IjowLjV9LCJ0cyI6MTUzNzI4MjI5NH0=\",\"merchant_sign\":\"2df2eb788c7d2f02efa53bf046389848e6259278\"}","description":"\u041e\u043f\u043b\u0430\u0442\u0430 \u0437\u0430\u043a\u0430\u0437\u0430 \u2116251","action":"pay-to-service","merchant_id":"428700","sign":"fb8a01eb17187cebdfdd6e1fe0675364"});
		// connect.send('VKWebAppOpenApp', {"app_id": 6695435, "location": "test-location"});

		// connect.send('VKWebAppAllowMessagesFromGroup', {"group_id": 83415396});
		// connect.send('VKWebAppDenyNotifications', {"group_id": 83415396});
		// connect.send('VKWebAppGetPhoneNumber');
		// connect.send('VKWebAppGetUserInfo', {});
		connect.send('VKWebAppGetGeodata')
			.then(data => console.log(data));
		// connect.send('VKWebAppOpenQR');
		// connect.send('VKWebAppGetAuthToken');
		// connect.send('VKWebAppUpdateInfo');
		// connect.send('VKWebAppOpenContacts');
		// if (this.state.access_token) {
		// 	connect.send("VKWebAppCallAPIMethod", {"method": "users.get", "request_id": "324nnefj", "params": {
		// 		"user_ids": "1,2,3",
		// 		"access_token": this.state.access_token
		// 	}});
		// } else {
		// 	connect.send("VKWebAppCallAPIMethod", {"method": "users.get", "request_id": "324nnefj", "params": {
		// 		"user_ids": "1,2,3",
		// 		"access_token": this.state.access_token
		// 	}});
		// }
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} data={this.state} go={this.go} />
				<Persik id="persik" go={this.go} />
			</View>
		);
	}
}

export default App;
