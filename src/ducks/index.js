// @flow

import { combineReducers } from 'redux';
import * as auth from './auth';
import * as activity from './activity';
import * as scope from './scope';

/*
Every module should export:
 * types - The constants for action types supported
 * actions - the action creators
 * reducer - the reduce function
*/

export type StoreType = {
  auth: auth.StateType,
  activity: activity.StateType,
  scope: scope.StateType
};

export const types = {
  auth: auth.types,
  activity: activity.types,
  scope: scope.types
};

export const actions = {
  auth: auth.actions,
  activity: activity.actions,
  scope: scope.actions
};

export const initialState = {
  auth: auth.initialState,
  activity: activity.initialState,
  scope: scope.initialState
};

// eslint-disable-next-line flowtype/no-weak-types
export default function reducers(): Function {
  return combineReducers({
    auth: auth.reducer,
    activity: activity.reducer,
    scope: scope.reducer
  });
}
