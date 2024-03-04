import { API_URL } from '@constants/constants';
import rootReducer from '@redux/rootReducer';
import axios from 'axios';
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import { multiClientMiddleware } from 'redux-axios-middleware';

const apiClients = {
  default: {
    client: axios.create({
      baseURL: `${API_URL}books/v1`,
    }),
  },
};

const middleware = applyMiddleware(multiClientMiddleware(apiClients));

export const store = createStore(rootReducer, {}, middleware);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { debug: false });
