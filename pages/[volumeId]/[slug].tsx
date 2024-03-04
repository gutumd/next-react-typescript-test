import { getBook } from '@redux/books/action-creators';
import { AppInitialProps, AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { Fragment } from 'react';

import { wrapper } from '../../redux/store';

const BooksItem = dynamic(() => import('@containers/BooksItem/BooksItem'));

const BooksItemPage = ({ pageProps }: AppProps) => {
  return (
    <Fragment>
      <Head>
        <title>{`${pageProps?.pageProps?.book?.volumeInfo?.title} - Google Books`}</title>
        <meta name='description' content={pageProps?.pageProps?.book?.volumeInfo?.subtitle} />
        <meta name='robots' content='index, follow' />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={`${pageProps?.pageProps?.book?.volumeInfo?.title} - Google Books`} />
        <meta property='og:description' content={pageProps?.pageProps?.book?.volumeInfo?.subtitle} />
        <meta
          property='og:image'
          content={
            pageProps?.pageProps?.book?.volumeInfo?.imageLinks &&
            pageProps?.pageProps?.book?.volumeInfo?.imageLinks?.thumbnail
              ? pageProps?.pageProps?.book?.volumeInfo?.imageLinks?.thumbnail
              : ''
          }
        />
        <meta
          name='keywords'
          content={
            pageProps?.pageProps?.book?.volumeInfo?.categories &&
            pageProps?.pageProps?.book?.volumeInfo?.categories?.length > 0
              ? pageProps?.pageProps?.book?.volumeInfo?.categories?.map((i: any) => i.toLowerCase()).join(', ')
              : ''
          }
        />
      </Head>
      <BooksItem {...pageProps.pageProps} />
    </Fragment>
  );
};

BooksItemPage.getInitialProps = wrapper.getInitialAppProps(store => async (ctx: any): Promise<AppInitialProps> => {
  await store.dispatch(getBook(ctx?.query?.volumeId));

  return {
    pageProps: {
      volume_id: ctx?.query?.volumeId,
      book_title: ctx?.query?.slug,
      book: store?.getState()?.BooksReducer?.book,
    },
  };
});

export default BooksItemPage;
