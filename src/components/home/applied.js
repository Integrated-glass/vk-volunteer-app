import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';
import {EventContext} from '../../context';
import {API_HOST} from '../../constants';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Horizontal from '@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

const styles = {
  horizontalItem: {
    width: 100,
    display: 'inline-block',
    fontSize: '.9rem',
    textAlign: 'center',
    paddingLeft: 5,
    paddingBottom: 15,
    marginRight: 15,
  },
  avatar: {
    margin: '0 auto 8px'
  },
  approved: {
    border: '2px solid #2223BC'
  }
};

const GET_APPLIED = gql`
    query getApplied($id: Int){
        events_volunteers(where: {volunteer_id: {_eq: $id}}) {
            participation_status
            event {
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
    }
`;

const Applied = ({go}) => {
  const client = useApolloClient();
  const [events, changeEvents] = useState([]);

  useEffect(() => {
    client.query({
      query: GET_APPLIED,
    }).then(result => { changeEvents(result.data.events_volunteers); })
  }, []);

  const goToEvent = (e, value, change) => {
    change(value);
    go(e);
  };

  return (
    <Group>
      <Header level="secondary">Мои мероприятия</Header>
      <Horizontal>
        <EventContext.Consumer>
          {({changeEvent}) => (
            <>
              {events && (
                <>
                  {events.map((event) => (
                    <div
                      onClick={(e) => goToEvent(e, event.event, changeEvent)}
                      data-to="event"
                      key={event.event.id}
                      style={ styles.horizontalItem }
                    >
                      <Avatar
                        type="app"
                        size={64}
                        style={ Object.assign({}, styles.avatar, (event.participation_status === 'APPROVED') ? styles.approved : {}) }
                        src={ API_HOST + '/' + event.event.photos[0].link }
                      />
                      { event.event.name }
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </EventContext.Consumer>
      </Horizontal>
    </Group>
  );
};

Applied.propTypes = {
  go: PropTypes.func.isRequired,
};

export default Applied;
