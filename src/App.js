import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { GQL_HOST } from './constants';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Event from './panels/event';
import { EventContext, UserContext } from './context';
import fetch from './fetch';

const clientApollo = new ApolloClient({ uri: GQL_HOST });

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [popout, changePopout] = useState(<ScreenSpinner size='large' />);
	const [modal, changeModal] = useState(null);
	const [event, changeEvent] = useState({});
	const [user, changeUser] = useState(null);

	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const profile = await connect.sendPromise('VKWebAppGetUserInfo');
			let user = {
				vk_id: profile.id || '',
				name: profile.first_name || '',
				surname: profile.last_name || '',
				date_of_birth: profile.bdate.match(/\./g).length === 2 ? profile.bdate : null,
				photo: profile.photo_100 || '',
			};
			user = await getUserFromServer(user);

			if (!user.email) user = {...user, email: await getEmail(user)};
			if (!user.phone_number) user = {...user, phone_number: await getTel(user)};
			changeUser(user);

			changePopout(null);
		}

		async function getUserFromServer(user) {
			return await fetch('/volunteer/login', 'POST', user);
		}

		async function getEmail(user) {
			try {
				const email = await connect.sendPromise('VKWebAppGetEmail', {});
				const res = await fetch('/volunteer/patch', 'POST', {vk_id: user.vk_id, update_data: {email: email.email}});
				return res.email;
			} catch (e) {
				console.warn(e);
			}
		}

		async function getTel(user) {
			try {
				const tel = await connect.sendPromise('VKWebAppGetPhoneNumber', {});
				const res = await fetch('/volunteer/patch', 'POST', {vk_id: user.vk_id, update_data: {phone_number: tel.phone_number}});
				return res.phone_number;
			} catch (e) {
				console.warn(e);
			}
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<EventContext.Provider value={{event, changeEvent}}>
			<UserContext.Provider value={{user, changeUser}}>
				<ApolloProvider client={clientApollo}>
					<View popout={popout} modal={modal} activePanel={activePanel}>
						<Home id="home" go={go} changePopout={changePopout} changeModal={changeModal}/>
						<Event id="event" go={go} />
					</View>
				</ApolloProvider>
			</UserContext.Provider>
		</EventContext.Provider>
	);
};

export default App;

