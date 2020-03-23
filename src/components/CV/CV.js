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
  const [tabletWrapOverflow, setTabletWrapOverflow] = useState({});
  const [cvWrapClasses, setCvWrapClasses] = useState([s.cvWrap]);
  const [linkActive, setLinkActive] = useState({});

  const disactive = () => {
    if (typeof cvWrapClasses !== 'string') return;

    setTimeout(() => {
      setTabletWrapOverflow({});
    }, 700);

    const cvWrapArray = cvWrapClasses.split(' ');
    cvWrapArray.pop();
    setTimeout(() => {
      cvWrapArray.pop();
      setCvWrapClasses(cvWrapArray);
    }, 700);
    setCvWrapClasses(cvWrapArray.join(' '));

    setTimeout(() => {
      setLinkActive({});
    }, 700);
  };

  const handleDisactive = ({ target, currentTarget }) => {
    if (target === currentTarget && typeof cvWrapClasses === 'string')
      disactive();
  };

  const handleKeyPress = ({ keyCode }) => {
    if (keyCode !== 27) return;
    disactive();
  };

  const handleActive = () => {
    if (typeof cvWrapClasses === 'string') return;

    setTabletWrapOverflow({ overflow: 'unset' });

    const cvWrapArray = cvWrapClasses;
    cvWrapArray.push(s.cvWrapActiveZIndex);
    cvWrapArray.push(s.cvWrapActive);
    const cvWrapString = cvWrapArray.join(' ');
    setCvWrapClasses(cvWrapString);

    setLinkActive({ pointerEvents: 'auto' });
  };

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
      onClick={({ target, currentTarget }) => {
        handleDisactive({ target, currentTarget });
        handleDisactiveChecked({ target, currentTarget });
      }}
      onKeyDown={({ keyCode }) => {
        handleKeyPress({ keyCode });
        handleKeyPressChecked({ keyCode });
      }}
    >
      <Header checkedHeader={checkedHeader} onCheckedHeader={onCheckedHeader} />

      <div className={s.downloadWrap}>
        <span className={s.downloadSpan}>{contentStore.download_cv}</span>
        <a
          className={s.downloadLink}
          title={contentStore.title.download}
          href={link}
        >
          {contentStore.download_cv}
        </a>
      </div>

      <div className={s.tabletWrap} style={tabletWrapOverflow}>
        <img className={s.tablet} src={tablet} alt="tablet" width="1920" />
        <button
          className={s.btn}
          title={contentStore.title.click}
          type="button"
          onClick={handleActive}
        />
        <div className={cvWrapClasses}>
          <a
            className={s.link}
            style={linkActive}
            title={contentStore.title.download}
            href={link}
          >
            <img className={s.cv} src={cv} alt="resume" width="1414" />
          </a>
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
