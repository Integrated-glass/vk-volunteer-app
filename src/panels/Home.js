import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Profile from '../components/home/profile';
import Applied from '../components/home/applied';
import Events from "../components/home/events";

const Home = ({ id, go, changePopout }) => {
	return (
		<Panel id={id}>
			<PanelHeader>Волонтёр</PanelHeader>
			<Profile changePopout={changePopout} />
			<Applied />
			<Events />
		</Panel>
	);
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	changePopout: PropTypes.func.isRequired,
};

export default Home;
