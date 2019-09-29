import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import dateFormat from '../../dates';
import { useApolloClient } from '@apollo/react-hooks';
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

const photos = [
  'https://images.unsplash.com/photo-1569284588568-00bf249daa4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1569326513472-830f1004d420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1569441499879-10880df919d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
  'https://images.unsplash.com/photo-1569000971931-79997657265f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
];

const GET_EVENTS = gql`
    {
        events {
            id
            description
            name
            start_datetime
            end_datetime
            roles {
                id
                name
                description
            }
        }
    }
`;

const Events = ({go}) => {
  const client = useApolloClient();
  const [events, changeEvents] = useState([]);

  const goToEvent = (e, value, change) => {
    change(value);
    go(e);
  };

  useEffect(() => {
    client.query({
      query: GET_EVENTS,
    }).then(result => { changeEvents(result.data.events); })
  }, []);

  return (
    <EventContext.Consumer>
      {({changeEvent}) => (
        <>
          {events && (
            <>
              {events.map((event, index) => (
                <Group key={ event.id }>
                  { index === 0 &&
                  <Group title="Все мероприятия"/>
                  }
                  <Cell
                    onClick={(e) => goToEvent(e, event, changeEvent)}
                    data-to="event"
                    description={ dateFormat(event.start_datetime, event.end_datetime) + ', ' + event.place }
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
                    {/*{event.photos.map((photo, i) => (*/}
                      <div style={{ background: `url(${photos[index % 4]})`, ...styles.image }} />
                    {/*))}*/}
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

        </>
      )}
    </EventContext.Consumer>
  );
};

Events.propTypes = {
  go: PropTypes.func.isRequired,
};

export default Events;
