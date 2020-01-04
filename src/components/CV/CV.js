import React from 'react';

import Header from '../Header/Header';
import cv from '../../images/cv/cv.png';
import tablet from '../../images/bg/cv-bg-img.png';
import s from './CV.module.css';

const CV = () => {
  return (
    <div className={s.main}>
      <Header />

      <div className={s.tabletWrap}>
        <img className={s.tablet} src={tablet} alt="tablet" width="4608" />
        <div className={s.cvWrap}>
          <img className={s.cv} src={cv} alt="resume" width="200" />
        </div>
      </div>
    </div>
  );
};

export default CV;
