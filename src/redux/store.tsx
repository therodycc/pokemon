import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import { rootPersistConfig, rootReducer } from './root-reducer';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

const persister = persistStore(store);

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch<any>();

export { store, persister, useSelector, useDispatch };
