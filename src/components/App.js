import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Languages from './Languages/Languages';
import Main from './Main/Main';
import CV from './CV/CV';
import Contacts from './Contacts/Contacts';

function App() {
  return (
    <>
      <Languages />

      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/cv" component={CV} />
        <Route exact path="/contacts" component={Contacts} />
      </Switch>
    </>
  );
}

export default App;
