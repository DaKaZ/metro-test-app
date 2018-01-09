import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import sinon from 'sinon';
import App, { AppIso } from '../app';
import { userMock } from '../../test/helpers';

jest.mock('react-native-orientation');
const Orientation = require('react-native-orientation'); // import Orientation from 'react-native-orientation';

/*
  I was not able to ditch the Provider component in this spec.
  Add the store directly on the AppIso component resulted in
  error when executed TestRenderer.create:

    Invariant Violation: Could not find "store" in either the
    context or props of "Connect(MainScreenIso)".

  I am not sure if this would occur when attemping to create
  any component that has child containers or if there is
  something special about this component.
*/
describe('<App />', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  const buildAppWithState = (initialState) => {
    const store = mockStore(initialState);
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  it('renders without crashing', () => {
    const initialState = {
      auth: { user: null },
      activity: { visible: false }
    };
    const component = renderer.create(buildAppWithState(initialState));
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders activity indicator', () => {
    const initialState = {
      auth: { user: null },
      activity: { visible: true, textContent: 'Loading...' }
    };
    const component = renderer.create(buildAppWithState(initialState));
    expect(component.toJSON()).toMatchSnapshot();
  });
});

describe('<AppIso />', () => {
  // overrides allows you to specify your own state hash or
  // mockLoadScope function.  If they are not specified the
  // defaults are used.
  const buildAppIso = (overrides = {}) => {
    const defaultState = {
      auth: { user: null },
      activity: { visible: false }
    };

    const mockLoadScope = overrides.mockLoadScope || jest.fn();
    const overrideState = overrides.state || {};
    const state = { ...defaultState, ...overrideState };
    const store = configureStore()(state);

    return (
      <Provider store={store}>
        <AppIso loadScope={mockLoadScope} activity={state.activity} />
      </Provider>
    );
  };

  it('should dispatch LOAD scope action', () => {
    const mockLoadScope = jest.fn();
    const component = renderer.create(buildAppIso({ mockLoadScope }));

    expect(component).toBeDefined();
    expect(mockLoadScope).toBeCalled();
  });

  it('handles timeout when mounted and unmounted', () => {
    const initialState = {
      auth: { user: null },
      activity: { visible: true, timeout: 987 } // picked an odd timeout to ensure it is unique
    };

    const component = renderer.create(buildAppIso({ state: initialState }));
    // can't check call count because a number of animation libs we use
    // run timers, so this is as good as it is going to get
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 987000);
    const { activityTimeout } = component.root.findByType(AppIso).instance;
    // lets make sure we actually got a real value
    expect(activityTimeout).not.toBeUndefined();

    component.unmount();

    expect(clearTimeout).toHaveBeenCalledWith(activityTimeout);
  });

  it('renders correctly in landscape mode', () => {
    const origOrientation = Orientation.default.getInitialOrientation();
    // eslint-disable-next-line no-underscore-dangle
    Orientation.default.__setOrientation('LANDSCAPE-LEFT');
    const component = renderer.create(buildAppIso());
    expect(component.toJSON()).toMatchSnapshot();
    // eslint-disable-next-line no-underscore-dangle
    Orientation.default.__setOrientation(origOrientation);
  });

  it('updates orientation state', () => {
    const component = renderer.create(buildAppIso());
    const { instance } = component.root.findByType(AppIso);
    const currentOrientation = instance.state.screenProps.orientation;
    // eslint-disable-next-line no-underscore-dangle
    instance._onOrientationDidChange(currentOrientation === 'PORTRAIT' ? 'LANDSCAPE' : 'PORTRAIT');
    expect(instance.state.screenProps.orientation).toBe(currentOrientation === 'PORTRAIT' ? 'LANDSCAPE' : 'PORTRAIT');
  });

  describe('componentWillReceiveProps', () => {
    const initialState = {
      auth: { user: null },
      activity: { visible: false }
    };
    const mockLoadScope = jest.fn();

    let store;
    let component;

    beforeEach(() => {
      const appIso = buildAppIso({ mockLoadScope, state: initialState });
      // these tests don't care about the store because we are testing
      // the componentWillReceiveProps by directly changing the props
      // of the unconnected component. However, react-redux does not
      // like it when the store instance is changed. So we get a reference
      // to the original store created so that we can reuse it lated when
      // we update the AppIso component.
      //
      // For some reason performing a destructing assignment for store
      // is causing the parser to choke.
      ({ store } = appIso.props);
      component = renderer.create(appIso);
    });

    const buildAppIsoWithActivityProp = activity => (
      <Provider store={store}>
        <AppIso loadScope={mockLoadScope} activity={activity} />
      </Provider>
    );

    it('sets timeout to null if component is not visible', () => {
      component.update(buildAppIsoWithActivityProp({ visible: false, timeout: 99 }));
      expect(component.root.findByType(AppIso).instance.state.timeout).toBeNull();
    });

    it('sets timeout to updated activity.timeout if component is visible', () => {
      component.update(buildAppIsoWithActivityProp({ visible: true, timeout: 99 }));
      expect(component.root.findByType(AppIso).instance.state.timeout).toEqual(99);
    });

    it('sets timeout to default if component is visible and timeout not in props', () => {
      component.update(buildAppIsoWithActivityProp({ visible: true }));
      expect(component.root.findByType(AppIso).instance.state.timeout).toEqual(60);
    });

    it('forces DRF logout when on web', () => {
      const buildAppIsoWithCurrentUserProp = currentUser => (
        <Provider store={store}>
          <AppIso
            loadScope={mockLoadScope}
            currentUser={currentUser}
            activity={{ visible: false }}
          />
        </Provider>
      );

      global.window = { location: { assign: sinon.spy() }, drf: true };
      const origOS = Platform.OS;
      Platform.OS = 'android';
      component = renderer.create(buildAppIso({ mockLoadScope, state: initialState }));
      component.getInstance();
      expect(window.location.assign.calledOnce).toBeFalsy();
      Platform.OS = 'web';

      component = renderer.create(buildAppIso({ mockLoadScope, state: initialState }));
      component.getInstance();
      // location change is on a 500 ms delay
      jest.runAllTimers();
      expect(window.location.assign.calledOnce).toBeTruthy();

      global.window = { location: { assign: sinon.spy() }, drf: true };
      component = renderer.create(buildAppIsoWithCurrentUserProp(userMock));
      component.getInstance();
      expect(window.location.assign.calledOnce).toBeFalsy();
      component.update(buildAppIsoWithCurrentUserProp(null));
      component.getInstance();
      jest.runAllTimers();
      expect(window.location.assign.calledOnce).toBeTruthy();
      Platform.OS = origOS;
    });
  });
});
