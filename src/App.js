import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './components/Main/Main';
import Contacts from './components/Contacts/Contacts';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/contacts" component={Contacts} />
      </Switch>
    </>
  );
}

export default App;
