import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import multiContent from '../../content/content.json';
import s from './Header.module.css';

const Header = () => {
  const select = useRef();
  console.log('select', select);
  // const content = {};
  const content = multiContent.en;

  // select.value === 'Русский' && ru = multiContent.ru;

  return (
    <header className={s.header}>
      <Helmet>
        <html lang="ru" />
      </Helmet>

      <Link className={s.logo} to="/">
        {content.logo}
      </Link>

      <ul className={s.nav}>
        <li className={s.navItem}>
          <Link to="/">{content.nav.main}</Link>
        </li>
        <li className={s.navItem}>
          <Link to="/cv">{content.nav.cv}</Link>
        </li>
        <li className={s.navItem}>
          <Link to="/contacts">{content.nav.contacts}</Link>
        </li>
      </ul>

      <select className={s.navLang} ref={select}>
        <option className={s.navItemLang}>English</option>
        <option className={s.navItemLang}>Русский</option>
        <option className={s.navItemLang}>Українська</option>
      </select>
    </header>
  );
};

export default Header;
