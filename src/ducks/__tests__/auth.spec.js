import Immutable from 'seamless-immutable';
import * as auth from '../auth';

describe('src/ducks/auth action creators', () => {
  it('should handle LOGIN_REQUEST', () => {
    const result = auth.actions.loginRequest('email@example.com', 'password');
    expect(result).toEqual({
      type: auth.types.LOGIN_REQUEST,
      email: 'email@example.com',
      password: 'password'
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    const user = { email: 'another@example.com', name: 'John Doe' };
    const token = { id: 1, token: 'abc' };
    const result = auth.actions.loginSuccess(user, token);
    expect(result).toEqual({
      type: auth.types.LOGIN_SUCCESS,
      user,
      token
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    const message = 'ERROR: Could not log you in';
    const result = auth.actions.loginFailure(message);
    expect(result).toEqual({
      type: auth.types.LOGIN_FAILURE,
      message
    });
  });

  it('should handle LOGOUT', () => {
    const result = auth.actions.logout();
    expect(result).toEqual({ type: auth.types.LOGOUT });
  });
});

describe('src/ducks/auth reducer', () => {
  const initialState = Immutable(auth.initialState);

  it('should have an initialState', () => {
    expect(auth.reducer()).toEqual(initialState);
  });

  it('should not affect state', () => {
    expect(auth.reducer(initialState, { type: 'NOT_EXISTING' })).toEqual(initialState);
  });

  it('should store the user on login success', () => {
    const existingState = Immutable({ ...initialState });
    const user = { email: 'someone@example.com', name: 'John Doe' };
    expect(auth.reducer(
      existingState,
      {
        type: auth.types.LOGIN_SUCCESS,
        user,
        token: '123'
      }
    )).toEqual({ ...existingState, user, apiToken: '123' });
  });

  it('should remove the user on logout', () => {
    const user = { email: 'someone@example.com', name: 'John Doe' };
    const existingState = Immutable({ ...initialState, user });
    expect(auth.reducer(
      existingState,
      { type: auth.types.LOGOUT }
    )).toEqual({ ...existingState, user: null });
  });

  it('should set loading to true on login request', () => {
    expect(auth.reducer(
      initialState,
      { type: auth.types.LOGIN_REQUEST }
    )).toEqual({ ...initialState, isLoading: true });
  });

  it('should clear loading and set error on login failure', () => {
    const failureMessage = 'This failed';
    expect(auth.reducer(
      initialState,
      {
        type: auth.types.LOGIN_FAILURE,
        message: failureMessage
      }
    )).toEqual({ ...initialState, isLoading: false, error: failureMessage });
  });
});
