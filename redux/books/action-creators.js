import { GOOGLE_API_KEY } from '@constants/constants';

import { types } from './action-types';
import { routes } from './routes';

export const getBooks = (search, page = 0) => {
  return {
    type: types.GET_BOOKS,
    payload: {
      request: {
        url: `${routes.BOOKS}${search ? `?q=${search}` : ''}`,
        method: 'GET',
        params: {
          key: GOOGLE_API_KEY,
          maxResults: 15,
          startIndex: page,
        },
      },
    },
  };
};

export const getBook = volumeId => {
  return {
    type: types.GET_BOOK,
    payload: {
      request: {
        url: `${routes.BOOKS}/${volumeId}?key=${GOOGLE_API_KEY}`,
        method: 'GET',
      },
    },
  };
};
