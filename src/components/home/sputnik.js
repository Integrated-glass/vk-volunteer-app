import React from 'react';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Info from '@vkontakte/vkui/dist/components/InfoRow/InfoRow';

const Sputnik = () => {
  return (
    <>
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
        <Button level="secondary" size="xl">Заказать</Button>
      </Div>
    </>
  );
};

export default Sputnik;
