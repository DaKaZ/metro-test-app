/* eslint-disable import/prefer-default-export */
// this file is a collection of functions and should not have a default export

import { put, call } from 'redux-saga/effects';
import * as auth from '../ducks/auth';
import * as activity from '../ducks/activity';
import { apiLogin } from '../util/api';

// worker Saga: will be fired on AUTH/LOGIN_REQUEST actions
export function* loginUser(action) {
  try {
    yield put(activity.actions.show('Logging in...'));
    // remove this when we have an API to call with user info
    const response = yield call(apiLogin, { email: action.email, password: action.password });
    yield put(activity.actions.hide());
    if (response.status >= 200 && response.status < 300 && response.data) {
      yield put(auth.actions.loginSuccess(response.data.user, response.data.token));
    } else {
      yield put({ type: auth.types.LOGIN_FAILURE, message: 'Unknown Error' });
    }
  } catch (e) {
    // console.log(e.message);
    yield put(activity.actions.hide());
    yield put({ type: auth.types.LOGIN_FAILURE, message: e.message });
  }
}
