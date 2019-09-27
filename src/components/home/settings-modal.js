import React, {useState} from 'react';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import CancelIcon from '@vkontakte/icons/dist/24/cancel';
import DoneIcon from '@vkontakte/icons/dist/24/done';
import PropTypes from "prop-types";

const SettingsModal = ({changeModal}) => {
  const [activeModal, changeActive] = useState('modal-settings');

  return (
    <ModalRoot activeModal={activeModal}>
      <ModalPage
        id="modal-settings"
        onClose={() => changeModal(null)}
        header={
          <ModalPageHeader
            left={<HeaderButton onClick={() => changeModal(null)}><CancelIcon /></HeaderButton>}
            right={<HeaderButton onClick={() => changeModal(null)}><DoneIcon /></HeaderButton>}
          >
            Изменить профиль
          </ModalPageHeader>
        }
      >
        <div>
        </div>
      </ModalPage>
    </ModalRoot>
  );
};

SettingsModal.propTypes = {
  changeModal: PropTypes.func.isRequired,
};

export default SettingsModal;
