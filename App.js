// In App.js in a new project

import * as React from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import {store}  from './src/redux/store';

import Router from './src/Router'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};


function App() {
  return (
    <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <Router/>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;