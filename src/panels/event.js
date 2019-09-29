import React from 'react';
import PropTypes from 'prop-types';
import {EventContext} from '../context';
import { platform, IOS } from '@vkontakte/vkui';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Footer from '@vkontakte/vkui/dist/components/Footer/Footer';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Info from '@vkontakte/vkui/dist/components/InfoRow/InfoRow';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osName = platform();

const styles = {
  event: {
    marginTop: 0,
  },
  gallery: {
    height: 200,
  },
  image: {
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%'
  },
  ageRestrict: {
    border: '1px solid #BB0011',
    borderRadius: '50%',
    padding: 10,
  },
  interests: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  interestButton: {
    marginBottom: '.5em',
  },
  header: {
    marginBottom: '-.5em',
  },
  applyButton: {
    marginTop: '-1em',
  }
};

const interests = [
  { id: 1, name: 'Секс' },
  { id: 2, name: 'Наркотики' },
  { id: 3, name: 'Рок-н-ролл' },
];

const Event = ({id, go}) => (
  <EventContext.Consumer>
    {({event}) => (
      <Panel id={id}>
        <PanelHeader
          left={<HeaderButton onClick={go} data-to="home">
            {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
          </HeaderButton>}
        >
          { event.name }
        </PanelHeader>
        <Group key={ event.id } style={styles.event}>
          <Gallery
            slideWidth="95%"
            style={ styles.gallery }
            bullets="dark"
          >
            {/*{event.photos.map((photo, i) => (*/}
              <div style={{ background: `url('https://images.unsplash.com/photo-1569284588568-00bf249daa4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')`, ...styles.image }} />
            {/*))}*/}
          </Gallery>
          <Cell
            description={ event.date + ', ' + event.place }
            asideContent={<div style={styles.ageRestrict}>18+</div>}
          >
            { event.name }
          </Cell>
          <Div style={ styles.interests }>
            {interests.map(interest => (
              <Button
                key={interest.id}
                style={ styles.interestButton }
                level="outline"
              >
                { interest.name }
              </Button>
            ))}
          </Div>
          <Div>
            <Info title="Описание">
              { event.description }
            </Info>
          </Div>
          <Div>
            <Info title="Доступ">
              Требуется карма > 55
            </Info>
          </Div>
        </Group>
        {event.roles.map((role, index) => (
          <Group key={role.id}>
            { index === 0 &&
              <Group title="Доступные роли"/>
            }
            <Header style={styles.header} level="secondary">{ role.name }</Header>
            <Div>{ role.description }</Div>
            <Div><Button style={styles.applyButton} size="l" level="primary">Податься</Button></Div>
          </Group>
        ))}
        <Footer>
          Если хочешь изменить мир, начни с себя!
        </Footer>
      </Panel>
    )}
  </EventContext.Consumer>
);

Event.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  event: PropTypes.shape({}),
};

export default Event;
