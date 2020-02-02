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
  const [link, setLink] = useState(null);
  const [tabletWrapClasses, setTabletWrapClasses] = useState([s.tabletWrap]);
  const [cvWrapClasses, setCvWrapClasses] = useState([s.cvWrap]);
  const [linkClasses, setLinkClasses] = useState([s.link]);

  const disactive = () => {
    if (typeof tabletWrapClasses !== 'string') return;

    const tabletWrapArray = tabletWrapClasses.split(' ');
    setTimeout(() => {
      tabletWrapArray.pop();
      setTabletWrapClasses(tabletWrapArray);
    }, 700);

    const cvWrapArray = cvWrapClasses.split(' ');
    cvWrapArray.pop();
    setTimeout(() => {
      cvWrapArray.pop();
      setCvWrapClasses(cvWrapArray);
    }, 700);
    setCvWrapClasses(cvWrapArray.join(' '));

    const linkArray = linkClasses.split(' ');
    setTimeout(() => {
      linkArray.pop();
      setLinkClasses(linkArray);
    }, 700);
  };

  function handleDisactive({ target, currentTarget }) {
    if (target === currentTarget && typeof tabletWrapClasses === 'string')
      disactive();
  }

  function handleKeyPress({ keyCode }) {
    if (keyCode !== 27) return;
    disactive();
  }

  function handleActive() {
    if (typeof tabletWrapClasses === 'string') return;

    const tabletWrapArray = tabletWrapClasses;
    tabletWrapArray.push(s.tabletWrapActive);
    const tabletWrapString = tabletWrapArray.join(' ');
    setTabletWrapClasses(tabletWrapString);

    const cvWrapArray = cvWrapClasses;
    cvWrapArray.push(s.cvWrapActiveZIndex);
    cvWrapArray.push(s.cvWrapActive);
    const cvWrapString = cvWrapArray.join(' ');
    setCvWrapClasses(cvWrapString);

    const linkArray = linkClasses;
    linkArray.push(s.linkActive);
    const linkString = linkArray.join(' ');
    setLinkClasses(linkString);
  }

  useEffect(() => {
    if (contentStore.lang === 'en') {
      setCv(cvEN);
      setLink(
        'https://drive.google.com/uc?export=download&id=11vVAXWVAtGT3S3jvlmr2-l7yFOVtcD4U',
      );
    } else if (contentStore.lang === 'ua') {
      setCv(cvUA);
      setLink(
        'https://drive.google.com/uc?export=download&id=1_PXWLhnOMHCdS9aPhyOBGrC2-YEWDATV',
      );
    } else if (contentStore.lang === 'ru') {
      setCv(cvRU);
      setLink(
        'https://drive.google.com/uc?export=download&id=1vNnfHAkqUQZo1LdigKXLYnM1577hwk-b',
      );
    }
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

      <div className={s.downloadWrap}>
        <span className={s.downloadSpan}>{contentStore.download_cv}</span>
        <a
          className={s.downloadLink}
          title={contentStore.title.download}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {contentStore.download_cv}
        </a>
      </div>

      <div
        className={s.tabletContainer}
        role="button"
        tabIndex="0"
        onClick={handleDisactive}
        onKeyDown={handleKeyPress}
      >
        <div className={tabletWrapClasses}>
          <img className={s.tablet} src={tablet} alt="tablet" width="1920" />
          <button
            className={s.btn}
            title={contentStore.title.click}
            type="button"
            onClick={handleActive}
          />
          <div className={cvWrapClasses}>
            <a
              className={linkClasses}
              title={contentStore.title.download}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className={s.cv} src={cv} alt="resume" width="1414" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

CV.propTypes = {
  contentStore: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    download_cv: PropTypes.string.isRequired,
    title: PropTypes.shape({
      click: PropTypes.string.isRequired,
      download: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = store => ({
  contentStore: getContent(store),
});

export default connect(mapStateToProps)(CV);
