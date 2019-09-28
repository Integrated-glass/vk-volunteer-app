import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Event from './panels/event';
import {EventContext} from './context';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [popout, changePopout] = useState(null);
	const [modal, changeModal] = useState(null);
	const [event, changeEvent] = useState({});

	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<EventContext.Provider value={{event, changeEvent}}>
			<View popout={popout} modal={modal} activePanel={activePanel}>
				<Home id="home" go={go} changePopout={changePopout} changeModal={changeModal} />
				<Event id="event" go={go} />
			</View>
		</EventContext.Provider>
	);
};

export default App;

