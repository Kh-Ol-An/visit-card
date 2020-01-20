import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import getContent from '../../redux/content/contentSelectors';
import Languages from '../Languages/Languages';
import s from './Header.module.css';

const Header = ({ contentStore, checkedHeader, onCheckedHeader }) => {
  const [checked, setChecked] = useState(checkedHeader);

  function handleChecked() {
    setChecked(!checked);
    onCheckedHeader(!checked);
  }

  useEffect(() => {
    !checkedHeader && setChecked(checkedHeader);
  }, [checkedHeader]);

  return (
    <header className={s.main}>
      <Helmet>
        <html lang={contentStore.lang} />
      </Helmet>

      <Languages />

      <Link className={s.logo} to="/">
        {contentStore.logo}
      </Link>

      <label className={s.navContainer}>
        <input
          className={s.check}
          type="checkbox"
          checked={checked}
          onChange={handleChecked}
        />
        <div className={s.lineWrap}>
          <span className={s.line1} />
          <span className={s.line2} />
          <span className={s.line3} />
        </div>
        <ul className={s.nav}>
          <li className={s.navItem}>
            <NavLink
              className={s.link}
              activeClassName={s.activeLink}
              exact
              to="/"
            >
              {contentStore.nav.main}
            </NavLink>
          </li>
          <li className={s.navItem}>
            <NavLink
              className={s.link}
              activeClassName={s.activeLink}
              exact
              to="/cv"
            >
              {contentStore.nav.cv}
            </NavLink>
          </li>
          <li className={s.navItem}>
            <NavLink
              className={s.link}
              activeClassName={s.activeLink}
              exact
              to="/contacts"
            >
              {contentStore.nav.contacts}
            </NavLink>
          </li>
        </ul>
      </label>
    </header>
  );
};

Header.propTypes = {
  contentStore: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    nav: PropTypes.shape({
      main: PropTypes.string.isRequired,
      cv: PropTypes.string.isRequired,
      me: PropTypes.string.isRequired,
      contacts: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  checkedHeader: PropTypes.bool.isRequired,
  onCheckedHeader: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  contentStore: getContent(store),
});

export default connect(mapStateToProps)(Header);
