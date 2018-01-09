import { AsyncStorage } from 'react-native';
import { call, put } from 'redux-saga/effects';

import { actions as scopeActions } from '../ducks/scope';

export const SCOPE_KEY = '@SCOPE_SELECTION';

export function* persistScope(action) {
  try {
    yield call(AsyncStorage.setItem, SCOPE_KEY, JSON.stringify(action.scope));
  } catch (e) {
    yield call(console.log, 'Error in persistScope saga!', e);
  }
}

export function* loadScope() {
  try {
    const stringScope = yield call(AsyncStorage.getItem, SCOPE_KEY);
    if (stringScope) {
      yield put(scopeActions.setScope(JSON.parse(stringScope)));
    }
  } catch (e) {
    yield call(console.log, 'Error in loadScope saga!', e);
  }
}
