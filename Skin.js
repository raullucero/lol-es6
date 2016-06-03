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
    borderWidth: 3,
    borderColor: '#BDBDBD',
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 3,
  },
});

export default Skin;
