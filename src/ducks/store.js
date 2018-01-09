// @flow

import { createStore, applyMiddleware } from 'redux';
import type { Store } from 'redux';

import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducers from './index';
import allSagas from '../sagas/index';

import type { StateType as AuthStateType } from '../ducks/auth';
import type { StateType as ActivityStateType } from '../ducks/activity';

// This should reflect our top level object in the store
export type StoreType = {
  auth: AuthStateType,
  activity: ActivityStateType
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default function getStore(initialState: StoreType): Store<*, *> {
  const store = createStore(
    reducers(),
    initialState,
    applyMiddleware(sagaMiddleware, logger)
  );
    // store.subscribe(() => console.log("Store Subscribe:", store.getState()));

    // then run the saga
  sagaMiddleware.run(allSagas);

  return store;
}
