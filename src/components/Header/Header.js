import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import getContent from '../../redux/content/contentSelectors';
import s from './Header.module.css';

const Header = ({ content }) => {
  return (
    <header className={s.main}>
      <Helmet>
        <html lang={content.lang} />
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
    </header>
  );
};

Header.propTypes = {
  content: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    nav: PropTypes.shape({
      main: PropTypes.string.isRequired,
      cv: PropTypes.string.isRequired,
      me: PropTypes.string.isRequired,
      contacts: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = store => ({
  content: getContent(store),
});

export default connect(mapStateToProps)(Header);
