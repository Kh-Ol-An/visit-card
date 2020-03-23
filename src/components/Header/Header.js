import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import getContent from '../../redux/content/contentSelectors';
import Languages from '../Languages/Languages';
import s from './Header.module.css';

const Header = ({ style, contentStore, checkedHeader, onCheckedHeader }) => {
  const [checked, setChecked] = useState(checkedHeader);

  const handleChecked = () => {
    setChecked(!checked);
    onCheckedHeader(!checked);
  };

  useEffect(() => {
    !checkedHeader && setChecked(checkedHeader);
  }, [checkedHeader]);

  const mainClasses = [s.main];
  mainClasses.push(style);

  return (
    <header className={mainClasses.join(' ')}>
      <Helmet>
        <html lang={contentStore.lang} />
      </Helmet>

      <Languages />

      <Link className={s.logo} to="/" title={contentStore.title.main}>
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
              title={contentStore.title.main}
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
              title={contentStore.title.cv}
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
              title={contentStore.title.contacts}
            >
              {contentStore.nav.contacts}
            </NavLink>
          </li>
        </ul>
      </label>
    </header>
  );
};

Header.defaultProps = {
  style: null,
};

Header.propTypes = {
  style: PropTypes.string,
  contentStore: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    nav: PropTypes.shape({
      main: PropTypes.string.isRequired,
      cv: PropTypes.string.isRequired,
      me: PropTypes.string.isRequired,
      contacts: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.shape({
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
