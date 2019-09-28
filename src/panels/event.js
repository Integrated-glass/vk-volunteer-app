import React from 'react';
import PropTypes from 'prop-types';
import {EventContext} from '../context';
import { platform, IOS } from '@vkontakte/vkui';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
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
};

const Event = ({id, go}) => (
  <EventContext.Consumer>
    {({event}) => (
      <Panel id={id}>
        <PanelHeader
          left={<HeaderButton onClick={go} data-to="home">
            {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
          </HeaderButton>}
        >
          Мероприятие
        </PanelHeader>
        <Group key={ event.id } style={styles.event}>
          <Cell onClick={go} data-to="event" description={ event.date + ', ' + event.place }>
            { event.name }
          </Cell>
          <Gallery
            onClick={go} data-to="event"
            slideWidth="95%"
            style={ styles.gallery }
            bullets="dark"
          >
            {event.photos.map((photo, i) => (
              <div key={i} style={{ background: `url(${photo})`, ...styles.image }} />
            ))}
          </Gallery>
          <Div>
            <Info title="Описание">
              { event.description }
            </Info>
          </Div>
        </Group>
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
