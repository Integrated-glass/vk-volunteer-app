import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import fetch from '../../fetch';
import {API_HOST} from '../../constants';
import {UserContext} from '../../context';
import ActionSheetItem from '@vkontakte/vkui/dist/components/ActionSheetItem/ActionSheetItem';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import ActionSheet from '@vkontakte/vkui/dist/components/ActionSheet/ActionSheet';

const QRPopout = ({changePopout}) => {
  const [qr, changeQR] = useState(null);
  const user = useContext(UserContext);

  useEffect( () => {
    async function getQR() {
      const res = await fetch('/qr/volunteer/' + user.user.id, 'GET');
      changeQR(res.image_uri);
    }
    getQR();
  }, []);

  return (
    <ActionSheet onClose={() => changePopout(null)}>
      <ActionSheetItem autoclose>
        {qr ? (
          <img
            height={250}
            style={{ margin: 'auto' }}
            src={API_HOST + '/api' + qr}
            alt="Your QR code"
          />
        ) : (
          <Div>
            У вас еще нет QR кода
          </Div>
        )}
      </ActionSheetItem>
    </ActionSheet>
  );
};

QRPopout.propTypes = {
  changePopout: PropTypes.func.isRequired,
};

export default QRPopout;
