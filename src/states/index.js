import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['history'],
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: __DEV__,
  middleware: m => m().concat(logger),
});
export default store;
export const persistor = persistStore(store);

const getStore = () => store;
export const getState = () => getStore() && getStore()?.getState();
export const dispatch = data => getStore() && getStore()?.dispatch(data);
