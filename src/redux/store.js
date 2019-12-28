import { createStore, combineReducers } from 'redux';
import contentReducer from './content/contentReducers';

const rootReducer = combineReducers({
  content: contentReducer,
});

const store = createStore(rootReducer);

export default store;
