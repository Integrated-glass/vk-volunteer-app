import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Event from './panels/event';
import { EventContext, UserContext } from './context';

const client = new ApolloClient({
	uri: 'http://demo130.foxtrot.vkhackathon.com:8081/v1/graphql',
});

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
				date_of_birth: profile.bdate || '',
				photo: profile.photo_100 || '',
			};
			user = await getUserFromServer(user);
			if (!user.email) {
				user = {...user, email: await getEmail()};
			}
			if (!user.tel) {
				user = {...user, phone_number: await getTel()};
			}
			changeUser(user);
			console.log(user);

			changePopout(null);
		}
		async function getUserFromServer(user) {
			return await user;
		}
		async function getEmail() {
			try {
				const email = await connect.sendPromise('VKWebAppGetEmail', {});
				return email.email;
			} catch (e) {
				console.warn(e);
			}
		}
		async function getTel() {
			try {
				const tel = await connect.sendPromise('VKWebAppGetPhoneNumber', {});
				return tel.phone_number;
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
				<ApolloProvider client={client}>
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

