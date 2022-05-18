import '../styles/globals.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../shared/store'
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Header />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
