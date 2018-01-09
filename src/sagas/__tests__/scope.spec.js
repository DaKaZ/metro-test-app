import sagaHelper from 'redux-saga-testing';
import Immutable from 'seamless-immutable';
import { put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { persistScope, loadScope, SCOPE_KEY } from '../scope';
import { actions as scopeActions, types } from '../../ducks/scope';
import { scopeMock } from '../../../test/helpers';

describe('persistScope SAGA', () => {
  const mockAction = Immutable({ scope: scopeMock, type: types.SET });
  const it = sagaHelper(persistScope(mockAction));

  it('should store the scope', (result) => {
    const scopeString = JSON.stringify(scopeMock);
    expect(result).toEqual(call(AsyncStorage.setItem, SCOPE_KEY, scopeString));
  });

  it('should be done', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('persistScope SAGA exception', () => {
  const mockAction = Immutable({ scope: scopeMock, type: types.SET });
  const it = sagaHelper(persistScope(mockAction));
  const error = new Error('Something went wrong');

  it('should store the scope', (result) => {
    const scopeString = JSON.stringify(scopeMock);
    expect(result).toEqual(call(AsyncStorage.setItem, SCOPE_KEY, scopeString));
    return error;
  });

  it('should log error', (result) => {
    // the way the sagas are tested the console.log method is never called
    // eslint-disable-next-line no-console
    expect(result).toEqual(call(console.log, 'Error in persistScope saga!', error));
  });

  it('should be done', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('loadScope SAGA when persisted scope present', () => {
  const it = sagaHelper(loadScope());

  it('should retrieve the scope', (result) => {
    const scopeString = JSON.stringify(scopeMock);
    expect(result).toEqual(call(AsyncStorage.getItem, SCOPE_KEY));
    return scopeString;
  });

  it('should dispatch an action', (result) => {
    expect(result).toEqual(put(scopeActions.setScope(scopeMock)));
  });

  it('should be done', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('loadScope SAGA when persisted scope NOT present', () => {
  const it = sagaHelper(loadScope());

  it('should retrieve the scope', (result) => {
    expect(result).toEqual(call(AsyncStorage.getItem, SCOPE_KEY));
    return null;
  });

  it('should be done', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('loadScope SAGA exception', () => {
  const it = sagaHelper(loadScope());
  const error = new Error('Something went wrong');

  it('should error when attempting to retrieve the scope', (result) => {
    expect(result).toEqual(call(AsyncStorage.getItem, SCOPE_KEY));
    return error;
  });

  it('should log error', (result) => {
    // the way the sagas are tested the console.log method is never called
    // eslint-disable-next-line no-console
    expect(result).toEqual(call(console.log, 'Error in loadScope saga!', error));
  });

  it('should be done', (result) => {
    expect(result).toBeUndefined();
  });
});
