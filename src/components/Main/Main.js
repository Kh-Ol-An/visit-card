import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getContent from '../../redux/content/contentSelectors';
import Header from '../Header/Header';
import s from './Main.module.css';

const Main = ({ contentStore }) => {
  const [checkedHeader, setCheckedHeader] = useState(false);

  function handleDisactiveChecked({ target }) {
    !target.className.includes('Header') &&
      !target.className.includes('Languages') &&
      checkedHeader &&
      setCheckedHeader(false);
  }

  function handleKeyPressChecked({ keyCode }) {
    if (keyCode !== 27) return;
    checkedHeader && setCheckedHeader(false);
  }

  function onCheckedHeader(checked) {
    setCheckedHeader(checked);
  }

  return (
    <div
      className={s.main}
      role="button"
      tabIndex="0"
      onClick={handleDisactiveChecked}
      onKeyDown={handleKeyPressChecked}
    >
      <Header checkedHeader={checkedHeader} onCheckedHeader={onCheckedHeader} />

      <div className={s.wrapScreen}>
        <div className={s.innerScreen}>
          <div className={s.screen}>
            <p className={s.text}>{contentStore.text}</p>
            <p className={s.ps}>{contentStore.ps}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  contentStore: PropTypes.shape({
    text: PropTypes.string.isRequired,
    ps: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = store => ({
  contentStore: getContent(store),
});

export default connect(mapStateToProps)(Main);
