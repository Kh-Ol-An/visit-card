import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import getContent from '../../redux/content/contentSelectors';
import Header from '../Header/Header';
import s from './Main.module.css';

const Main = ({ contentStore }) => {
  const [checkedHeader, setCheckedHeader] = useState(false);

  const handleDisactiveChecked = ({ target }) => {
    !target.className.includes('Header') &&
      !target.className.includes('Languages') &&
      checkedHeader &&
      setCheckedHeader(false);
  };

  const handleKeyPressChecked = ({ keyCode }) => {
    if (keyCode !== 27) return;
    checkedHeader && setCheckedHeader(false);
  };

  const onCheckedHeader = checked => {
    setCheckedHeader(checked);
  };

  return (
    <div
      className={s.main}
      role="button"
      tabIndex="0"
      onClick={handleDisactiveChecked}
      onKeyDown={handleKeyPressChecked}>
      <Header
        style={s.header}
        checkedHeader={checkedHeader}
        onCheckedHeader={onCheckedHeader}
      />

      <div className={s.wrapMobile}>
        <p className={s.textMobile}>{contentStore.text}</p>
        <div className={s.ps}>
          <span>{contentStore.psBefor}</span>
          <Link
            className={s.psLink}
            to="/contacts"
            title={contentStore.title.contacts}>
            {contentStore.psLink}
          </Link>
          <span>{contentStore.psAfter}</span>
        </div>
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
            <div className={s.ps}>
              <span>{contentStore.psBefor}</span>
              <Link
                className={s.psLink}
                to="/contacts"
                title={contentStore.title.contacts}>
                {contentStore.psLink}
              </Link>
              <span>{contentStore.psAfter}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  contentStore: PropTypes.shape({
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    psBefor: PropTypes.string.isRequired,
    psLink: PropTypes.string.isRequired,
    psAfter: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = store => ({
  contentStore: getContent(store),
});

export default connect(mapStateToProps)(Main);
