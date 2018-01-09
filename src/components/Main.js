// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import type { NavigationProp } from 'react-navigation';
import Bounceable from 'react-native-bounceable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Config from '../util/config';
import Styles, { Colors } from './../styles';

type PropsType = {
  navigation: NavigationProp<*>
};

type StateType = {
  fadeAnim: number,
  logoWidth: number
};

class Main extends Component<void, PropsType, StateType> {
  static navigationOptions = {
    header: null
  };

  state: StateType = {
    fadeAnim: new Animated.Value(0),
    logoWidth: Dimensions.get('window').width * 0.3
  };

  componentWillMount() {
    if (this.props.screenProps && this.props.screenProps.currentUser) {
      this.props.navigation && this.props.navigation.navigate('Tabs');
    }
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, { toValue: 1, delay: 2000 }).start();
  }

  componentWillUnmount() {
    Animated.timing(this.state.fadeAnim, { toValue: 0, delay: 100 }).start();
  }

  _login: () => void = () => {
    console.log('logging in');
  };

  _handleLayout: () => void = (e: any) => {
    const { width, height } = e.nativeEvent.layout;
    const newWidth = Math.min(width, height) * 0.7;
    if (this.state.logoWidth !== newWidth) {
      this.setState({ logoWidth: newWidth });
    }
  };

  render(): React.Element<*> {
    return (
      <View style={[Styles.container, styles.container]}>
        <View id="appName" style={styles.lowerView}>
          <View style={Styles.squareContainer}>
            <Text id="app-name" style={styles.appName}>
              {Config().name}
            </Text>
          </View>
          <View style={Styles.squareContainer}>
            <Animated.View style={{ opacity: this.state.fadeAnim }}>
              <Bounceable onPress={this._login}>
                <View style={styles.button}>
                  <MaterialIcons
                    name="vpn-key"
                    size={72}
                    style={{ color: Colors.lightForeground }}
                  />
                  <View style={styles.subContainer}>
                    <Text style={styles.title}>Log In</Text>
                    <Text style={styles.description}>Log in to get started!</Text>
                  </View>
                </View>
              </Bounceable>
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dhsLtBlue
  },
  upperView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lowerView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.lightForeground
  },
  description: {
    fontSize: 12,
    color: Colors.lightPrimary,
    paddingTop: 5
  },
  subContainer: {
    padding: 10,
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row'
  },
  appName: {
    fontSize: 48,
    color: Colors.dhsWhite,
    textAlign: 'center'
  }
});

export default Main;
