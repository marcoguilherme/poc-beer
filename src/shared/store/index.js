import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './ducks';
import Sagas from './sagas';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const sagaMiddleware = createSagaMiddleware();

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("session") : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = (state, action) => {
  if (action.type === 'SESSION_DESTROY') {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem('persist:root');
    // eslint-disable-next-line no-param-reassign
    state = {};
  }
  return reducers(state, action);
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});
const persistor = persistStore(store);
sagaMiddleware.run(Sagas);

export { store, persistor };
