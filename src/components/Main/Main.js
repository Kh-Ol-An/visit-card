import React from 'react';
import { Link } from 'react-router-dom';

import bgImg from '../../images/img/bg-img.jpg';
import content from '../../content/content.json';
import s from './Main.module.css';

const Main = () => {
  return (
    <main className={s.main}>
      <header className={s.header}>
        <Link className={s.logo} to="/">
          {content.logo}
        </Link>
        <ul className={s.nav}>
          <li className={s.navItem}>{content.nav.main}</li>
          <li className={s.navItem}>{content.nav.cv}</li>
          <li className={s.navItem}>
            <Link to="/contacts">{content.nav.contacts}</Link>
          </li>
        </ul>
      </header>

      <img className={s.bgImg} src={bgImg} alt="background" />
    </main>
  );
};

export default Main;
