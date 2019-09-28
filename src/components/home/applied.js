import React from 'react';
import PropTypes from 'prop-types';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Horizontal from '@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

const styles = {
  horizontalItem: {
    flexShrink: 0,
    width: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '.9rem',
    textAlign: 'center',
    paddingLeft: 5,
    paddingBottom: 15,
  },
  avatar: {
    marginBottom: 8
  }
};

const events = [
  {
    id: 1,
    name: 'Chess tournament'
  },
  {
    id: 2,
    name: 'VK Hackathon'
  },
  {
    id: 3,
    name: 'Digital breakthrough'
  },
  {
    id: 4,
    name: 'Shilov\'s lecture killing'
  },
];

const Applied = ({go}) => {
  return (
    <Group>
      <Header level="secondary">Мои мероприятия</Header>
      <Horizontal>
        <div style={{ display: 'flex' }}>
          { events.map(event => (
            <div key={event.id} style={ styles.horizontalItem }>
              <Avatar
                type="app"
                size={64}
                style={ styles.avatar }
                src="https://pp.userapi.com/c844616/v844616889/9ec4a/9Fk-RI7uchQ.jpg"
              />
              { event.name }
            </div>
          ))}
        </div>
      </Horizontal>
    </Group>
  );
};

Applied.propTypes = {
  go: PropTypes.func.isRequired,
};

export default Applied;
