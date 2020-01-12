import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import contentReducer from './content/contentReducers';

const rootReducer = combineReducers({
  content: contentReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
