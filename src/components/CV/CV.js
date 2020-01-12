import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getContent from '../../redux/content/contentSelectors';
import Header from '../Header/Header';
import cvEN from '../../assets/images/cv/cv-en.png';
import cvUA from '../../assets/images/cv/cv-ua.png';
import cvRU from '../../assets/images/cv/cv-ru.png';
import tablet from '../../assets/images/bg/cv-bg-img.png';
import s from './CV.module.css';

const CV = ({ content }) => {
  const [cv, setCv] = useState(null);
  const [cvWrapClasses, setCvWrapClasses] = useState([s.cvWrap]);
  const [tabletWrapClasses, setTabletWrapClasses] = useState([s.tabletWrap]);

  const disactive = () => {
    const cvWrapArray = cvWrapClasses.split(' ');
    cvWrapArray.pop();
    setCvWrapClasses(cvWrapArray);

    const tabletWrapArray = tabletWrapClasses.split(' ');
    tabletWrapArray.pop();
    setTabletWrapClasses(tabletWrapArray);
  };

  function handleKeyPress({ keyCode }) {
    if (cvWrapClasses.length === 1 && tabletWrapClasses.length === 1) return;
    if (keyCode !== 27) return;
    disactive();
  }

  function handleActive() {
    const cvWrapArray = cvWrapClasses;
    cvWrapArray.push(s.cvWrapActive);
    const cvWrapString = cvWrapArray.join(' ');
    setCvWrapClasses(cvWrapString);

    const tabletWrapArray = tabletWrapClasses;
    tabletWrapArray.push(s.tabletWrapActive);
    const tabletWrapString = tabletWrapArray.join(' ');
    setTabletWrapClasses(tabletWrapString);
  }

  function handleDisactive({ target, currentTarget }) {
    if (
      target === currentTarget &&
      cvWrapClasses.length > 1 &&
      tabletWrapClasses.length > 1
    ) {
      disactive();
    }
  }

  useEffect(() => {
    content.lang === 'en' && setCv(cvEN);
    content.lang === 'ua' && setCv(cvUA);
    content.lang === 'ru' && setCv(cvRU);
  }, [content.lang]);

  return (
    <div
      className={s.main}
      role="button"
      tabIndex="0"
      onClick={handleDisactive}
      onKeyDown={handleKeyPress}
    >
      <Header />

      <div className={tabletWrapClasses}>
        <button className={s.btn} type="button" onClick={handleActive} />
        <img className={s.tablet} src={tablet} alt="tablet" width="4608" />
        <div className={cvWrapClasses}>
          <img className={s.cv} src={cv} alt="resume" width="1414" />
        </div>
      </div>
    </div>
  );
};

CV.propTypes = {
  content: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = store => ({
  content: getContent(store),
});

export default connect(mapStateToProps)(CV);
