import React from 'react';
import { connect } from 'react-redux';
// import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import getContent from '../redux/content/contentSelectors';
import { content } from '../redux/content/contentActions';
import multiContents from '../content/content.json';
import Main from './Main/Main';
import CV from './CV/CV';
import Contacts from './Contacts/Contacts';
import fade from '../transition/transition.module.css';

function App({ contentStore, enterContent }) {
  !contentStore && enterContent(multiContents[0]);

  return (
    <Router>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames={fade} key={location.key} timeout={300}>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/cv" component={CV} />
                <Route exact path="/contacts" component={Contacts} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  );
}

App.propTypes = {
  contentStore: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.shape({
      lang: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      nav: PropTypes.shape({
        main: PropTypes.string.isRequired,
        cv: PropTypes.string.isRequired,
        me: PropTypes.string.isRequired,
        contacts: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ]).isRequired,
  enterContent: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  contentStore: getContent(store),
});

const mapDispatchToProps = dispatch => ({
  enterContent: value => dispatch(content(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
