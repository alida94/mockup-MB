import React from 'react';
import configureStore from './states';
import enUS from '@ant-design/react-native/lib/locale-provider/en_US';
// import { Provider as ReduxProvider } from 'react-redux';
// import { Provider as AntProvider } from '@ant-design/react-native';
import { Provider } from 'react-redux';
import MapScreen from './screens/home';

export default () => {
  return (
    <Provider locale={enUS} store={configureStore}>
      <MapScreen />
    </Provider>
  );
};
