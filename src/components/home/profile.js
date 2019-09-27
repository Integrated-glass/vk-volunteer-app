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

const Profile = ({ changePopout, changeModal }) => {
  const openQR = () => changePopout(
    <QRPopout changePopout={changePopout} />
  );

  const openSettings = () => changeModal(
    <SettingsModal changeModal={changeModal} />
  );

  return (
    <Group style={ styles.profile }>
      <Cell
        before={<Avatar src="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg" size={80} />}
        size="l"
        description="18 лет"
        asideContent={
          <div style={ styles.profileRight }>
								<span style={ styles.karma }>
									Карма: 69
								</span>
            <Icon24Settings onClick={openSettings} style={ styles.icon } />
          </div>
        }
        bottomContent={
          <div style={ styles.qr }>
            <Button onClick={openQR} size="m">Мой QR</Button>
          </div>
        }
      >
        Семён Ефимов
      </Cell>
      <Cell
        size="l"
        bottomContent={
          <div style={ styles.interests }>
            <Button level="outline" style={{ marginBottom: '.5em' }}>Секс</Button>
            <Button level="outline" style={{ marginBottom: '.5em' }}>Наркотики</Button>
            <Button level="outline" style={{ marginBottom: '.5em' }}>Рок-н-ролл</Button>
            <Button level="outline" style={{ marginBottom: '.5em' }}>Котики</Button>
            <Button level="outline" style={{ marginBottom: '.5em' }}>Цветы</Button>
            <Button level="outline" style={ styles.interestButton }>Политех</Button>
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
};

export default Profile;
