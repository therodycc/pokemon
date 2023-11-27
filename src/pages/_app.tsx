import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/common/error-boundary/index';
import { store } from '../redux/store';
import '../styles/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  )
}

export default MyApp
