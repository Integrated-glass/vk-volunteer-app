import React, {useState} from 'react';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import CancelIcon from '@vkontakte/icons/dist/24/cancel';
import DoneIcon from '@vkontakte/icons/dist/24/done';
import PropTypes from 'prop-types';

import Interests from './interests';
import Sputnik from './sputnik';

const SETTINGS = 'modal-settings';
const SPUTNIK = 'modal-sputnik';
const INTERESTS = 'modal-interests';

const SettingsModal = ({changeModal}) => {
  const [activeModal, changeActive] = useState(SETTINGS);

  return (
    <ModalRoot activeModal={activeModal}>
      <ModalPage
        id={SETTINGS}
        onClose={() => changeModal(null)}
        header={
          <ModalPageHeader
            left={<HeaderButton onClick={() => changeModal(null)}><CancelIcon /></HeaderButton>}
          >
            Изменить профиль
          </ModalPageHeader>
        }
      >
        <Div>
          <Button level="secondary" onClick={() => changeActive(INTERESTS)} size="xl">Выбрать интересы</Button>
          <Button level="secondary" style={{ marginTop: '.5em' }} onClick={() => changeActive(SPUTNIK)} size="xl">Карта «Спутник»</Button>
          <Button level="secondary" style={{ marginTop: '.5em' }} size="xl" disabled>История волонтёрства</Button>
        </Div>
      </ModalPage>

      <ModalPage
        id="modal-sputnik"
        onClose={() => changeActive(SETTINGS)}
        header={
          <ModalPageHeader
            left={<HeaderButton onClick={() => changeActive(SETTINGS)}><CancelIcon /></HeaderButton>}
          >
            Карта «Спутник»
          </ModalPageHeader>
        }
      >
        <Sputnik />
      </ModalPage>

      <ModalPage
        id="modal-interests"
        onClose={() => changeActive(SETTINGS)}
        header={
          <ModalPageHeader
            left={<HeaderButton onClick={() => changeActive(SETTINGS)}><CancelIcon /></HeaderButton>}
            right={<HeaderButton onClick={() => changeActive(SETTINGS)}><DoneIcon /></HeaderButton>}
          >
            Интересы
          </ModalPageHeader>
        }
      >
        <Interests />
      </ModalPage>
    </ModalRoot>
  );
};

SettingsModal.propTypes = {
  changeModal: PropTypes.func.isRequired,
};

export default SettingsModal;
