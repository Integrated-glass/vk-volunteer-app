import React from 'react';
import PropTypes from 'prop-types';
import ActionSheetItem from '@vkontakte/vkui/dist/components/ActionSheetItem/ActionSheetItem';
import ActionSheet from '@vkontakte/vkui/dist/components/ActionSheet/ActionSheet';

const QRPopout = ({changePopout}) => {
  return (
    <ActionSheet onClose={() => changePopout(null)}>
      <ActionSheetItem autoclose>
        <img
          width={250}
          height={250}
          style={{ margin: 'auto' }}
          src="https://cdn.qrstuff.com/images/default_qrcode.png"
          alt="Your QR code"
        />
      </ActionSheetItem>
    </ActionSheet>
  );
};

QRPopout.propTypes = {
  changePopout: PropTypes.func.isRequired,
};

export default QRPopout;
