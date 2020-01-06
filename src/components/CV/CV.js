import React, { useState, useEffect, useRef } from 'react';
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
  const refCvWrap = useRef(null);
  const widthrefCvWrap = refCvWrap.current ? refCvWrap.current.clientWidth : 0;
  const heightrefCvWrap = refCvWrap.current
    ? refCvWrap.current.offsetHeight
    : 0;
  console.log('widthrefCvWrap', widthrefCvWrap);
  console.log('heightrefCvWrap', heightrefCvWrap);

  useEffect(() => {
    content.lang === 'en' && setCv(cvEN);
    content.lang === 'ua' && setCv(cvUA);
    content.lang === 'ru' && setCv(cvRU);
  });

  return (
    <div className={s.main}>
      <Header />

      <div className={s.tabletWrap}>
        <div
          className={s.btn}
          style={{
            width: `${widthrefCvWrap}px`,
            height: `${heightrefCvWrap}px`,
          }}
        />
        <img className={s.tablet} src={tablet} alt="tablet" width="4608" />
        <div className={s.cvWrap} ref={refCvWrap}>
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
