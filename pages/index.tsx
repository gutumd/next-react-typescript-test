import { getBooks } from '@redux/books/action-creators';
import { AppInitialProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { wrapper } from '../redux/store';

const BooksFeed = dynamic(() => import('@containers/BooksFeed/BooksFeed'));

const HomePage = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage && localStorage.getItem('query')) dispatch(getBooks(`${localStorage.getItem('query')}`));
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Books</title>
        <meta name='description' content='Books' />
      </Head>
      <BooksFeed {...props} />
    </Fragment>
  );
};

HomePage.getInitialProps = wrapper.getInitialAppProps(store => async ({ ctx }): Promise<AppInitialProps> => {
  return {
    pageProps: {},
  };
});

export default HomePage;
