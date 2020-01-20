import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getContent from '../../redux/content/contentSelectors';
import Header from '../Header/Header';
import cvEN from '../../assets/images/cv/cv-en.jpg';
import cvUA from '../../assets/images/cv/cv-ua.jpg';
import cvRU from '../../assets/images/cv/cv-ru.jpg';
import tablet from '../../assets/images/bg/cv-bg-img.png';
import s from './CV.module.css';

const CV = ({ contentStore }) => {
  const [cv, setCv] = useState(null);
  const [cvWrapClasses, setCvWrapClasses] = useState([s.cvWrap]);
  const [tabletWrapClasses, setTabletWrapClasses] = useState([s.tabletWrap]);

  const disactive = () => {
    if (
      typeof cvWrapClasses !== 'string' &&
      typeof tabletWrapClasses !== 'string'
    )
      return;
    const cvWrapArray = cvWrapClasses.split(' ');
    cvWrapArray.pop();
    setTimeout(() => {
      cvWrapArray.pop();
      setCvWrapClasses(cvWrapArray);
    }, 700);
    setCvWrapClasses(cvWrapArray.join(' '));

    const tabletWrapArray = tabletWrapClasses.split(' ');
    setTimeout(() => {
      tabletWrapArray.pop();
      setTabletWrapClasses(tabletWrapArray);
    }, 700);
  };

  function handleDisactive({ target, currentTarget }) {
    if (
      target === currentTarget &&
      typeof cvWrapClasses === 'string' &&
      typeof tabletWrapClasses === 'string'
    )
      disactive();
  }

  function handleKeyPress({ keyCode }) {
    if (keyCode !== 27) return;
    disactive();
  }

  function handleActive() {
    if (
      typeof cvWrapClasses === 'string' &&
      typeof tabletWrapClasses === 'string'
    )
      return;
    const cvWrapArray = cvWrapClasses;
    cvWrapArray.push(s.cvWrapActiveZIndex);
    cvWrapArray.push(s.cvWrapActive);
    const cvWrapString = cvWrapArray.join(' ');
    setCvWrapClasses(cvWrapString);

    const tabletWrapArray = tabletWrapClasses;
    tabletWrapArray.push(s.tabletWrapActive);
    const tabletWrapString = tabletWrapArray.join(' ');
    setTabletWrapClasses(tabletWrapString);
  }

  useEffect(() => {
    contentStore.lang === 'en' && setCv(cvEN);
    contentStore.lang === 'ua' && setCv(cvUA);
    contentStore.lang === 'ru' && setCv(cvRU);
  }, [contentStore.lang]);

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

      <div
        className={s.tabletContainer}
        role="button"
        tabIndex="0"
        onClick={handleDisactive}
        onKeyDown={handleKeyPress}
      >
        <div className={tabletWrapClasses}>
          <img className={s.tablet} src={tablet} alt="tablet" width="1920" />
          <button className={s.btn} type="button" onClick={handleActive} />
          <div className={cvWrapClasses}>
            <img className={s.cv} src={cv} alt="resume" width="1414" />
          </div>
        </div>
      </div>
    </div>
  );
};

CV.propTypes = {
  contentStore: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = store => ({
  contentStore: getContent(store),
});

export default connect(mapStateToProps)(CV);
