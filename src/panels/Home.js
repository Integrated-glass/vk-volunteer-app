import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Profile from '../components/home/profile';
import Applied from '../components/home/applied';

const Home = ({ id, go }) => {
	return (
		<Panel id={id}>
			<PanelHeader>Волонтёр</PanelHeader>
			<Profile />
			<Applied />
		</Panel>
	);
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
