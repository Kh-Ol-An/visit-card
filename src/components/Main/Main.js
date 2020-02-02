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
      <Header
        style={s.header}
        checkedHeader={checkedHeader}
        onCheckedHeader={onCheckedHeader}
      />

      <div className={s.wrapMobile}>
        <p className={s.textMobile}>{contentStore.text}</p>
        <p className={s.psMobile}>{contentStore.ps}</p>
      </div>

      <div className={s.widthLaptop}>
        <div className={s.heightLaptop}>
          <div className={s.wrapScreen}>
            <div className={s.topLeft} />
            <div className={s.topRight} />
            <div className={s.bottomLeft} />
            <div className={s.bottomRight} />
            <div className={s.leftTop} />
            <div className={s.rightTop} />
            <div className={s.leftBottom} />
            <div className={s.rightBottom} />
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
