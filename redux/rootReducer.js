import { combineReducers } from 'redux';

import BooksReducer from './books/reducers';

const rootReducer = combineReducers({
  BooksReducer,
});

export default rootReducer;
