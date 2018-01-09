import reducers, { actions, initialState } from '../index';

describe('src/ducks/index', () => {
  it('provides an initialState', () => {
    expect(initialState).toEqual({
      activity: { textContent: null, visible: false, timeout: 60 },
      auth: {
        apiToken: null,
        error: null,
        isLoading: false,
        rootNavigation: null,
        user: null
      },
      scope: { children: [], id: 0 }
    });
  });

  it('exports actions', () => {
    const actualKeys = Object.keys(actions);
    expect(actualKeys).toEqual(expect.arrayContaining(['auth', 'activity']));
  });

  it('exports types', () => {
    const actualKeys = Object.keys(actions);
    expect(actualKeys).toEqual(expect.arrayContaining(['auth', 'activity']));
  });

  it('exports reducers', () => {
    expect(reducers).not.toBeUndefined();
    // don't need to actually test combineReducers functionality
    expect(reducers()).not.toBeUndefined();
  });
});
