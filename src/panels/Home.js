import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Profile from '../components/home/profile';
import Applied from '../components/home/applied';
import Events from "../components/home/events";

const Home = ({ id, go, changePopout, changeModal }) => {
	return (
		<Panel id={id}>
			<PanelHeader>Волонтёр</PanelHeader>
			<Profile changePopout={changePopout} changeModal={changeModal} />
			<Applied go={go} />
			<Events go={go} />
		</Panel>
	);
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	changePopout: PropTypes.func.isRequired,
	changeModal: PropTypes.func.isRequired,
};

export default Home;
