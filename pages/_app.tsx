import { wrapper } from '@redux/store';
import { AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '../assets/styles/global.scss';
import AppContent from './_app_content';

type TProps = { isMobileView: boolean };

const CustomApp = ({ Component, pageProps, ...rest }: AppProps & TProps) => {
  const { store } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <AppContent Component={Component} pageProps={pageProps} />
    </Provider>
  );
};

CustomApp.getInitialProps = wrapper.getInitialAppProps(
  store =>
    async ({ Component, ctx }): Promise<TProps & AppInitialProps> => {
      if (global.window) global.window.scrollTo(0, 0);

      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

      let isMobileView = (!!ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent)?.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
      );

      return {
        pageProps: pageProps,
        isMobileView: Boolean(isMobileView),
      };
    },
);

export default CustomApp;
