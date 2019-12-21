import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './Main/Main';
import Contacts from './Contacts/Contacts';

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
