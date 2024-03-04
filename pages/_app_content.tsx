import Head from 'next/head';

const AppContent = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <main>
        <Component pageProps={pageProps} />
      </main>
    </>
  );
};

export default AppContent;
