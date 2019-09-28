import React from 'react';
import PropTypes from 'prop-types';
import {EventContext} from '../../context';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Info from '@vkontakte/vkui/dist/components/InfoRow/InfoRow';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

const styles = {
  gallery: {
    height: 200,
  },
  image: {
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%'
  },
};

const events = [
  {
    id: 1,
    name: 'Chess tournament',
    date: '16.01-23.02',
    place: 'Казань экспо',
    photos: [
      'https://images.unsplash.com/photo-1569284588568-00bf249daa4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      'https://images.unsplash.com/photo-1569326513472-830f1004d420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    id: 2,
    name: 'Digital breakthrough',
    date: '27.09-30.09',
    place: 'Кудыкина гора',
    photos: [
      'https://images.unsplash.com/photo-1569441499879-10880df919d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
      'https://images.unsplash.com/photo-1569000971931-79997657265f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    ],
    description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  },
];

const Events = ({go}) => {
  const goToEvent = (e, value, change) => {
    change(value);
    go(e);
  };

  return (
    <EventContext.Consumer>
      {({changeEvent}) => (
        <>
          {events.map((event, index) => (
            <Group key={ event.id }>
              { index === 0 &&
                <Group title="Все мероприятия"/>
              }
              <Cell
                onClick={(e) => goToEvent(e, event, changeEvent)}
                data-to="event"
                description={ event.date + ', ' + event.place }
              >
                { event.name }
              </Cell>
              <Gallery
                onClick={(e) => goToEvent(e, event, changeEvent)}
                data-to="event"
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
          ))}
        </>
      )}
    </EventContext.Consumer>
  );
};

Events.propTypes = {
  go: PropTypes.func.isRequired,
};

export default Events;
