import { AppInitialProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { Fragment } from 'react';

import { wrapper } from '../redux/store';

const Favorites = dynamic(() => import('@containers/Favorites/Favorites'));

const FavoritesPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Favorite Books</title>
        <meta name='description' content='Favorite Books' />
      </Head>
      <Favorites />
    </Fragment>
  );
};

FavoritesPage.getInitialProps = wrapper.getInitialAppProps(store => async ({ ctx }): Promise<AppInitialProps> => {
  return {
    pageProps: {},
  };
});

export default FavoritesPage;
