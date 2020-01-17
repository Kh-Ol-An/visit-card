import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import getContent from '../redux/content/contentSelectors';
import { content } from '../redux/content/contentActions';
import multiContents from '../content/content.json';
import Main from './Main/Main';
import CV from './CV/CV';
import Contacts from './Contacts/Contacts';
import fade from '../styles/transition/transition.module.css';

const routes = [
  { path: '/', Component: Main },
  { path: '/cv', Component: CV },
  { path: '/contacts', Component: Contacts },
];

function App({ contentStore, enterContent }) {
  !contentStore && enterContent(multiContents[0]);

  return (
    <Router>
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={300}
              classNames={fade}
              unmountOnExit
            >
              <Component />
            </CSSTransition>
          )}
        </Route>
      ))}
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
