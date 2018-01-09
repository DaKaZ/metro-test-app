// @flow

import React from 'react';
import { AppRegistry } from 'react-native';

import RootApp from './src/index';

const renderApp = (): React.Element<*> => <RootApp />;

// eslint-disable-next-line flowtype/no-weak-types
AppRegistry.registerComponent('testApp', (): Function => renderApp);
