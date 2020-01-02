import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import multiContents from '../content/content.json';
import Main from './Main/Main';
import CV from './CV/CV';
import Contacts from './Contacts/Contacts';
import { content } from '../redux/content/contentActions';
import s from './App.module.css';

function App({ enterContent }) {
  const [lang, setLang] = useState(null);
  const localLang = localStorage.getItem('lang');
  const flagClasses = [s.flag];
  (!lang || lang === 'en') && flagClasses.push(s.en);
  lang === 'ua' && flagClasses.push(s.ua);
  lang === 'ru' && flagClasses.push(s.ru);
  let counter = 1;

  if (!localLang) {
    localStorage.setItem('lang', 'en');
    setLang('en');
    enterContent(multiContents[0]);
  } else {
    multiContents.map(
      multiContent =>
        localLang === multiContent.lang && enterContent(multiContent),
    );
  }

  function handleChange({ target }) {
    const { value } = target;
    setLang(value);
    localStorage.setItem('lang', value);
  }

  useEffect(() => {
    setLang(localLang);
    multiContents.map(
      multiContent => lang === multiContent.lang && enterContent(multiContent),
    );
  });

  return (
    <>
      <div className={s.langWrap}>
        {multiContents.map(multiContent => {
          const labelClasses = [s.label];
          const disable = 'disable';
          lang === multiContent.lang && labelClasses.push(s.enable);
          lang !== multiContent.lang &&
            labelClasses.push((s.disable = disable + counter)) &&
            counter++;
          return (
            <label className={labelClasses.join(' ')} key={multiContent.lang}>
              <input
                type="radio"
                name="language"
                value={multiContent.lang}
                checked={lang === multiContent.lang}
                onChange={handleChange}
              />
              {multiContent.language}
              <div className={flagClasses.join(' ')} />
            </label>
          );
        })}
      </div>

      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/cv" component={CV} />
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
