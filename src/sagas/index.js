import { takeLatest } from 'redux-saga/effects';
import { types as authTypes } from '../ducks/auth';
import { types as scopeTypes } from '../ducks/scope';
import { loginUser } from './user';
import { persistScope, loadScope } from './scope';

function* allSagas() {
  yield* [
    takeLatest(authTypes.LOGIN_REQUEST, loginUser),
    takeLatest(scopeTypes.SET, persistScope),
    takeLatest(scopeTypes.LOAD, loadScope)
  ];
}

export default allSagas;
