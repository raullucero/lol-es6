import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';


class NoChamps extends Component {
  render() {
    var text = '';
    if (this.props.filter) {
      text = `No results for “${this.props.filter}”`;
    } else {
      text = 'No champion found';
    }

    return (
      <View style={[styles.containerNoChamp, styles.centerText]}>
        <Text style={styles.noMoviesText}>{text}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  containerNoChamp: {
    flex: 1,
    alignItems: 'center',
  }
});

export default NoChamps;
