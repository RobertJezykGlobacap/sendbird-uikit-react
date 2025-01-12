import React, {
  useContext, useState, useMemo, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { LocalizationContext } from '../../../lib/LocalizationContext';
import Icon, { IconTypes, IconColors } from '../../../ui/Icon';

import './search-box.scss';

const EMPTY_STRING = '';
const COMPONENT_CLASS_NAME = 'sendbird-channel-search-box';

const SearchBox = ({
  onSearch,
  debounceInMilliseconds,
  wrapperStyle,
  ...inputDomAttributes
}) => {
  const [channelSearchString, setSearchString] = useState(EMPTY_STRING);
  const { stringSet } = useContext(LocalizationContext);
  const searchRef = useRef(null);

  const handleOnChange = ({ target }) => {
    const { value } = target;

    setSearchString(value);
    onSearch(value);
  };

  const resetSearchString = () => {
    searchRef.current.value = EMPTY_STRING;
    setSearchString(EMPTY_STRING);
    onSearch(EMPTY_STRING);
  };

  const debouncedHandleOnChange = useMemo(
    () => debounce(handleOnChange, debounceInMilliseconds),
    [onSearch],
  );

  useEffect(() => () => {
    debouncedHandleOnChange.cancel();
  }, []);

  return (
    <div className={`${COMPONENT_CLASS_NAME}__input`} style={wrapperStyle}>
      <div className={`${COMPONENT_CLASS_NAME}__input__container`}>
        <Icon
          className={`${COMPONENT_CLASS_NAME}__input__container__search-icon`}
          type={IconTypes.SEARCH}
          fillColor={IconColors.ON_BACKGROUND_3}
          width="24px"
          height="24px"
        />
        <input
          type="text"
          className={`${COMPONENT_CLASS_NAME}__input__container__input-area`}
          placeholder={stringSet.SEARCH}
          ref={searchRef}
          onChange={debouncedHandleOnChange}
          {...inputDomAttributes} // eslint-disable-line react/jsx-props-no-spreading
        />
        {channelSearchString && (
          <Icon
            className={`${COMPONENT_CLASS_NAME}__input__container__reset-input-button`}
            type={IconTypes.REMOVE}
            fillColor={IconColors.ON_BACKGROUND_3}
            width="20px"
            height="20px"
            onClick={resetSearchString}
          />
        )}
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func,
  wrapperStyle: PropTypes.object,
  debounceInMilliseconds: PropTypes.number,
};

SearchBox.defaultProps = {
  onSearch: () => {},
  wrapperStyle: {},
  debounceInMilliseconds: 400,
};

export default SearchBox;
