import React from 'react';
import PropTypes from 'prop-types';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import SettingsModal from './settings-modal';
import QRPopout from './qr-popout';

const styles = {
  profileRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: '-1.5em'
  },
  karma: {
    color: '#3a7532',
  },
  profile: {
    marginTop: 0,
  },
  icon: {
    marginTop: '.5em',
    cursor: 'pointer',
  },
  qr: {
    display: 'flex',
  },
  interests: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  interestButton: {
    marginBottom: '.5em',
  }
};

const Profile = ({ changePopout, changeModal, user }) => {
  const openQR = () => changePopout(
    <QRPopout changePopout={changePopout} />
  );

  const openModals = (active) => changeModal(
    <SettingsModal changeModal={changeModal} active={active} />
  );

  return (
    <Group style={ styles.profile }>
      <Cell
        before={<Avatar src={user.photo} size={80}/>}
        size="l"
        description={user.date_of_birth}
        asideContent={
          <div style={styles.profileRight}>
                <span style={styles.karma}>
                  Карма: 69
                </span>
            <Icon24Settings onClick={() => openModals('modal-settings')} style={styles.icon}/>
          </div>
        }
        bottomContent={
          <div style={styles.qr}>
            <Button onClick={openQR} size="m">Мой QR</Button>
          </div>
        }
      >
        {user.name + ' ' + user.surname}
      </Cell>
      <Cell
        size="l"
        bottomContent={
          <div style={styles.interests}>
            {user.interests.map(interest => (
              <Button
                key={interest.id}
                onClick={() => openModals('modal-interests')}
                style={styles.interestButton}
                level="outline"
              >
                {interest.name}
              </Button>
            ))}
          </div>
        }
      >
        Интересы
      </Cell>
    </Group>
  );
};

Profile.propTypes = {
  changePopout: PropTypes.func.isRequired,
  changeModal: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default Profile;
