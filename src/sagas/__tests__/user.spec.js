import sagaHelper from 'redux-saga-testing';
import { put, call } from 'redux-saga/effects';
import { loginUser } from '../user';
import * as auth from '../../ducks/auth';
import * as activity from '../../ducks/activity';
import { apiLogin } from '../../util/api';

const user = { name: 'Sample User', email: 'just@test.com' };
const token = { id: 1, token: 'abc' };

describe('loginUser SAGA', () => {
  const mockAction = { email: 'just@test.com', password: 'password' };
  const it = sagaHelper(loginUser(mockAction));

  it('should display the activity indicator', (result) => {
    expect(result).toEqual(put({ type: activity.types.SHOW, textContent: 'Logging in...' }));
  });

  it('should call apiLogin', (result) => {
    expect(result).toEqual(call(apiLogin, mockAction));
    return {
      data: { user, token },
      status: 200
    };
  });

  it('and then hide the activity indicator', (result) => {
    expect(result).toEqual(put({ type: activity.types.HIDE }));
  });

  it('and dispatch login success', (result) => {
    expect(result).toEqual(put({ type: auth.types.LOGIN_SUCCESS, user, token }));
  });
});

describe('loginUser SAGA exception', () => {
  const mockAction = { email: 'just@test.com', password: 'password' };
  const it = sagaHelper(loginUser(mockAction));

  it('should display the activity indicator', (result) => {
    expect(result).toEqual(put({ type: activity.types.SHOW, textContent: 'Logging in...' }));
  });

  it('should call apiLogin', (result) => {
    expect(result).toEqual(call(apiLogin, mockAction));
    return new Error('Something went wrong');
  });

  it('and then hide the activity indicator', (result) => {
    expect(result).toEqual(put({ type: activity.types.HIDE }));
  });

  it('and dispatch login success', (result) => {
    expect(result).toEqual(put({ type: auth.types.LOGIN_FAILURE, message: 'Something went wrong' }));
  });
});
