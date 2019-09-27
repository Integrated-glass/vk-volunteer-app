import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

const Home = ({ id, go }) => {
	return (
		<Panel id={id}>
			<PanelHeader>Волонтёр</PanelHeader>
			<Group style={{ marginTop: 0 }}>
				<Cell
					before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg" size={80} />}
					size="l"
					description="18 лет"
					asideContent={
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '-1.5em' }}>
								<span style={{ color: '#3a7532' }}>
									Карма: 69
								</span>
							<Icon24Settings style={{ marginTop: '.5em', cursor: 'pointer' }} />
						</div>
					}
					bottomContent={
						<div style={{ display: 'flex' }}>
							<Button size="m">Мой QR</Button>
						</div>
					}
				>
					Семён Ефимов
				</Cell>
				<Cell
					size="l"
					bottomContent={
						<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
							<Button level="outline" style={{ marginBottom: '.5em' }}>Секс</Button>
							<Button level="outline" style={{ marginBottom: '.5em' }}>Наркотики</Button>
							<Button level="outline" style={{ marginBottom: '.5em' }}>Рок-н-ролл</Button>
							<Button level="outline" style={{ marginBottom: '.5em' }}>Котики</Button>
							<Button level="outline" style={{ marginBottom: '.5em' }}>Цветы</Button>
							<Button level="outline" style={{ marginBottom: '.5em' }}>Политех</Button>
						</div>
					}
				>
					Интересы
				</Cell>
			</Group>


			<Group title="Navigation Example">
				<Div>
					<Button size="xl" level="2" onClick={go} data-to="persik">
						Show me the Persik, please
					</Button>
				</Div>
			</Group>
		</Panel>
	);
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;
