import React, {useState} from 'react';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Info from '@vkontakte/vkui/dist/components/InfoRow/InfoRow';
import CancelIcon from '@vkontakte/icons/dist/24/cancel';
import DoneIcon from '@vkontakte/icons/dist/24/done';
import PropTypes from 'prop-types';

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
        id={SPUTNIK}
        onClose={() => changeActive(SETTINGS)}
        header={
          <ModalPageHeader
            left={<HeaderButton onClick={() => changeActive(SETTINGS)}><CancelIcon /></HeaderButton>}
          >
            Карта «Спутник»
          </ModalPageHeader>
        }
      >
        <Div style={{ height: 200 }}>
          <img style={{ width: '100%' }} src="https://www.gmig.ru/upload/medialibrary/1ca/1cab8c01dc6aef8c1e6dacaf454307a7.png" alt="" />
        </Div>

        <Div>
          <Info title="Описание">
            Карта лояльности для музейных волонтеров «Спутник» даёт право бесплатного
            прохода на крупнейшие площадки и постоянные экспозиции этих музеев и предоставляет
            бонусы от партнеров программы: приложения для чтения книг Bookmate, книжного магазина
            MMOMA ART BOOK SHOP и гастро-бара Powerhouse
          </Info>
        </Div>
        <Div>
          <Button level="secondary" onClick={() => changeActive(SETTINGS)} size="xl">Заказать</Button>
        </Div>
      </ModalPage>

      <ModalPage
        id={INTERESTS}
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
        <FormLayout>
          <FormLayoutGroup>
            <Input type="text" defaultValue="" placeholder="Поиск" />
          </FormLayoutGroup>
        </FormLayout>
      </ModalPage>
    </ModalRoot>
  );
};

SettingsModal.propTypes = {
  changeModal: PropTypes.func.isRequired,
};

export default SettingsModal;
