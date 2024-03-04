import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html prefix='og:http://ogp.me/ns#' lang='en'>
        <Head>
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body itemType='http://schema.org/WebPage'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
