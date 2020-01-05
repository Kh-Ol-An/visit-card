import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getContent from '../../redux/content/contentSelectors';
import Header from '../Header/Header';
import cvEN from '../../images/cv/cv-en.png';
import cvUA from '../../images/cv/cv-ua.png';
import cvRU from '../../images/cv/cv-ru.png';
import tablet from '../../images/bg/cv-bg-img.png';
import s from './CV.module.css';

const CV = ({ content }) => {
  const [cv, setCv] = useState(null);

  useEffect(() => {
    content.lang === 'en' && setCv(cvEN);
    content.lang === 'ua' && setCv(cvUA);
    content.lang === 'ru' && setCv(cvRU);
  });

  return (
    <div className={s.main}>
      <Header />

      <div className={s.tabletWrap}>
        <img className={s.tablet} src={tablet} alt="tablet" width="4608" />
        <div className={s.cvWrap}>
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
