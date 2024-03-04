import update from 'immutability-helper';

export const getBooks = (state, { data: data }) => {
  let newState = update(state, { books: { $set: data } });
  return newState;
};

export const getBook = (state, { data: data }) => {
  let newState = update(state, { book: { $set: data } });
  return newState;
};

