// @flow

import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import getStore from './ducks/store';

import type { StoreType } from './ducks/store';

const Root = ({ initalState }: {initalState: StoreType}): React.Element<*> => {
  const store = getStore(initalState);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
