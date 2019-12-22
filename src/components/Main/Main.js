import React from 'react';
import { Link } from 'react-router-dom';

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
          <li className={s.navItem}>
            <Link to="/main">{content.nav.main}</Link>
          </li>
          <li className={s.navItem}>
            <Link to="/cv">{content.nav.cv}</Link>
          </li>
          <li className={s.navItem}>
            <Link to="/contacts">{content.nav.contacts}</Link>
          </li>
        </ul>
      </header>
    </main>
  );
};

export default Main;
