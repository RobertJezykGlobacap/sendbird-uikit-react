import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default function Checkbox({
  id,
  checked,
  onChange,
  labelStyles,
}) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <label className="sendbird-checkbox" htmlFor={id} {...labelStyles}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="sendbird-checkbox--checkmark" />
    </label>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  labelStyles: PropTypes.object,
};

Checkbox.defaultProps = {
  id: 'sendbird-checkbox-input',
  checked: false,
  onChange: () => { },
  labelStyles: {},
};
