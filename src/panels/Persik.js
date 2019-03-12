import React from 'react';
import PropTypes from 'prop-types';
import connect from '../vk-connect';
import {Panel, PanelHeader, HeaderButton, platform, IOS, Div} from '@vkontakte/vkui';
import persik from '../img/persik.png';
import './Persik.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();
class Persik extends React.Component {

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
				case 'VKWebAppGetAuthTokenResult':
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
		connect.send('VKWebAppSetLocation', {"location": "ololo"});
		connect.send('VKWebAppGetClientVersion');
		connect.send('VKWebAppGetEmail');
		connect.send('VKWebAppGetPhoneNumber');
		connect.send('VKWebAppGetUserInfo', {});
		connect.send('VKWebAppGetGeodata');
		connect.send('VKWebAppOpenQR');
		connect.send('VKWebAppGetAuthToken');
		connect.send('VKWebAppUpdateInfo');
		connect.send('VKWebAppOpenContacts');
	}

	render() {
		const props = this.props;
		return <Panel id={props.id}>
		<PanelHeader
			left={<HeaderButton onClick={props.go} data-to="home">
				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			Persik Hello
		</PanelHeader>
		<img className="Persik" src={persik} alt="Persik The Cat"/>
		<Div>
			{Object.keys(this.state).map(type => <article>
				<h3>{type}</h3>
				<p>{JSON.stringify(this.state[type])}</p>
			</article>)}
		</Div>
	</Panel>
	}
}

// const Persik = props => (
// 	<Panel id={props.id}>
// 		<PanelHeader
// 			left={<HeaderButton onClick={props.go} data-to="home">
// 				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
// 			</HeaderButton>}
// 		>
// 			Persik Hello
// 		</PanelHeader>
// 		<img className="Persik" src={persik} alt="Persik The Cat"/>
// 	</Panel>
// );

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Persik;
