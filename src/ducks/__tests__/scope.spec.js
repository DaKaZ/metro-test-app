import Immutable from 'seamless-immutable';
import * as scope from '../scope';

const mockScope = Immutable({
  id: 123,
  children: [],
  description: 'this is totally fake',
  code: '00001234567890'
});

describe('src/ducks/scope action creators', () => {
  it('provides function loadScope()', () => {
    const result = scope.actions.loadScope();
    expect(result).toEqual({ type: scope.types.LOAD });
  });

  it('provides function setScope()', () => {
    const result = scope.actions.setScope(mockScope);
    expect(result).toEqual({ type: scope.types.SET, scope: mockScope });
  });
});

describe('src/ducks/scope reducer', () => {
  const initialState = Immutable(scope.initialState);

  it('should have an initialState', () => {
    expect(scope.reducer()).toEqual(initialState);
  });

  it('should not affect state', () => {
    const result = scope.reducer(initialState, { type: 'NOT_EXISTING' });
    expect(result).toEqual(initialState);
  });

  it('should store the scope on SET', () => {
    const existingState = Immutable(initialState);
    expect(scope.reducer(existingState, {
      type: scope.types.SET,
      scope: mockScope
    })).toEqual(mockScope);
  });

  it('should do nothing on LOAD', () => { // this is currently handled by a saga
    const existingState = Immutable(initialState);
    expect(scope.reducer(existingState, {
      type: scope.types.LOAD
    })).toEqual(existingState);
  });
});
