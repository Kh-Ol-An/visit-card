import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import multiContent from '../content/content.json';
import Main from './Main/Main';
import Contacts from './Contacts/Contacts';
import { content } from '../redux/content/contentActions';
import s from './App.module.css';

function App({ enterContent }) {
  enterContent(multiContent.en);

  function handleChange({ target }) {
    const { value } = target;
    if (value === 'en') enterContent(multiContent.en);
    else if (value === 'ua') enterContent(multiContent.ua);
    else if (value === 'ru') enterContent(multiContent.ru);
  }

  return (
    <>
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
