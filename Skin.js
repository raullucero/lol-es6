import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

class Skin extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <View style={styles.button}>
        <Image style={styles.wrapperSkin} source={{uri:this.props.uri}} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  wrapperSkin: {
    width: 124,
    height: 224,

  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 3,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
});

export default Skin;
