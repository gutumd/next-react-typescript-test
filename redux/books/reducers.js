import { HYDRATE } from 'next-redux-wrapper';

import { types } from './action-types';
import * as action from './actions';

const initialStates = {
  books: null,
  book: null,
};

let hydrate = false;

export const BooksReducer = (state = initialStates, result) => {
  const { type, payload } = result;

  switch (type) {
    case HYDRATE: {
      if (hydrate) return state;

      hydrate = true;

      return { ...initialStates, ...payload.BooksReducer };
    }

    case types.GET_BOOKS_SUCCESS:
      return action.getBooks(state, payload);

    case types.GET_BOOK_SUCCESS:
      return action.getBook(state, payload);

    default:
      return state;
  }
};

export default BooksReducer;
