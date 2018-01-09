// @flow

import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Orientation from 'react-native-orientation';
import DeviceInfo from 'react-native-device-info';

// import DrawerNav from './components/DrawerNav';
import Main from './components/Main';
import Styles, { Colors } from './styles';
import { actions as activityActions } from './ducks/activity';
import { actions as scopeActions } from './ducks/scope';
import { actions as authActions } from './ducks/auth';
// import types
import type { StoreType } from './ducks/store';
import type { StateType as ActivityStateType } from './ducks/activity';

type PropsType = {
  activity: ActivityStateType,
  currentUser: ?{},
  logout: ?Function
};
const mobile = Platform.OS === 'ios' || Platform.OS === 'android';
class AppIso extends React.Component {
  constructor(props: PropsType) {
    super(props);
    const init = mobile ? Orientation.getInitialOrientation() : 'LANDSCAPE';
    this.state = {
      screenProps: {
        orientation: init,
        drawerLockMode: 'locked-closed',
        logout: props.logout,
        currentUser: props.currentUser
      }
    };
  }

  componentDidMount() {
    if (mobile) {
      Orientation.addOrientationListener(this._onOrientationDidChange);
      if (!DeviceInfo.isTablet()) {
        Orientation.lockToPortrait(); // this will lock the view to Portrait
      }
    }
    this._checkTimeout();
  }

  componentWillReceiveProps(nextProps: PropsType) {
    this.setState({
      screenProps: { ...this.state.screenProps, currentUser: nextProps.currentUser }
    });
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }

  _onOrientationDidChange = (orientation: string) => {
    if (this.state.orientation === orientation) return;
    this.setState({ screenProps: { ...this.state.screenProps, orientation } });
  };

  render(): React.Element<*> {
    return (
      <View style={[Styles.container, styles.container]}>
        <Main screenProps={this.state.screenProps} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lighGrayBackground
  }
});

const mapStateToProps = (store: StoreType): {} => ({
  activity: store.activity,
  currentUser: store.auth.user
});

const mapDispatchToProps = { ...activityActions, ...scopeActions, logout: authActions.logout };

export { AppIso };

export default connect(mapStateToProps, mapDispatchToProps)(AppIso);
