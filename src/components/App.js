import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import multiContent from '../content/content.json';
import Main from './Main/Main';
import Contacts from './Contacts/Contacts';
import { content } from '../redux/content/contentActions';
import s from './App.module.css';

function App({ enterContent }) {
  const [lang, setLang] = useState('en');
  enterContent(multiContent.en);
  // if (lang === 'en') enterContent(multiContent.en);
  // else if (lang === 'ua') enterContent(multiContent.ua);
  // else if (lang === 'ru') enterContent(multiContent.ru);

  useEffect(() => {
    if (lang === 'en') enterContent(multiContent.en);
    else if (lang === 'ua') enterContent(multiContent.ua);
    else if (lang === 'ru') enterContent(multiContent.ru);
  });

  function handleChange({ target }) {
    const { value } = target;
    setLang(value);
    // if (value === 'en') enterContent(multiContent.en);
    // else if (value === 'ua') enterContent(multiContent.ua);
    // else if (value === 'ru') enterContent(multiContent.ru);
  }

  const flagClasses = [s.flag];
  if (lang === 'en') flagClasses.push(s.en);
  else if (lang === 'ua') flagClasses.push(s.ua);
  else if (lang === 'ru') flagClasses.push(s.ru);

  return (
    <>
      <div className={s.selectWrap}>
        <select className={s.selectLang} onChange={handleChange}>
          <option className={s.optionLang} value="en">
            English
          </option>
          <option className={s.optionLang} value="ua">
            Українська
          </option>
          <option className={s.optionLang} value="ru">
            Русский
          </option>
        </select>
        <div className={flagClasses.join(' ')} />
      </div>

      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/contacts" component={Contacts} />
      </Switch>
    </>
  );
}

App.propTypes = {
  enterContent: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  enterContent: value => dispatch(content(value)),
});

export default connect(null, mapDispatchToProps)(App);
