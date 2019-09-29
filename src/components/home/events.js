import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {API_HOST} from '../../constants';
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

const GET_EVENTS = gql`
    {
        events {
            id
            description
            name
            start_datetime
            end_datetime
            age_restriction
            base_karma_to_pay
            location
            photos {
                id
                link
            }
            roles {
                id
                name
                description
            }
            event_tags {
                tag {
                    id
                    name
                }
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
                    description={ dateFormat(event.start_datetime, event.end_datetime) + ', ' + event.location }
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
                    {event.photos && event.photos.map((photo) => (
                      <div key={photo.id} style={{ background: `url('${API_HOST + '/' + photo.link}')`, ...styles.image }} />
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

        </>
      )}
    </EventContext.Consumer>
  );
};

Events.propTypes = {
  go: PropTypes.func.isRequired,
};

export default Events;
