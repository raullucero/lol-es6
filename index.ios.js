/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Menu from './Menu';

import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} from 'react-native';

class Lol extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'LolInfo',
          component: Menu,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
});

AppRegistry.registerComponent('Lol', () => Lol);
