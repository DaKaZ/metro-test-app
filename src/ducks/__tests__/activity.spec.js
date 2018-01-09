import Immutable from 'seamless-immutable';
import * as activity from '../activity';

describe('src/ducks/activity action creators', () => {
  it('should handle SHOW', () => {
    const result = activity.actions.show('A Message', 72);
    expect(result).toEqual({
      type: activity.types.SHOW,
      textContent: 'A Message',
      timeout: 72
    });
  });

  it('should handle HIDE', () => {
    const result = activity.actions.hide();
    expect(result).toEqual({ type: activity.types.HIDE });
  });
});

describe('src/ducks/auth reducer', () => {
  const initialState = Immutable(activity.initialState);

  it('should have an initialState', () => {
    expect(activity.reducer()).toEqual(initialState);
  });

  it('should not affect state', () => {
    expect(activity.reducer(initialState, { type: 'NOT_EXISTING' })).toEqual(initialState);
  });

  it('should store the textContent on show', () => {
    const existingState = Immutable({ ...initialState });
    const message = 'A message for testing';
    const timeout = 67;
    expect(activity.reducer(
      existingState,
      {
        type: activity.types.SHOW,
        textContent: message,
        timeout
      }
    )).toEqual({ ...existingState, visible: true, textContent: message, timeout });
  });

  it('should clear textContent on hide', () => {
    const message = 'A message for testing';
    const existingState = Immutable({ ...initialState, visible: true, textContent: message });
    expect(activity.reducer(
      existingState,
      { type: activity.types.HIDE }
    )).toEqual({ ...existingState, visible: false, textContent: null, timeout: null });
  });
});
