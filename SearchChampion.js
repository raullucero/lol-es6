import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ActivityIndicatorIOS,
  TextInput,
  TouchableHighlight,
  Text
} from 'react-native';

class SearchChampion extends Component {
  render() {
    return (
      <View
        style={styles.searchBar} >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChange={this.props.onSearchChange}
          placeholder="Search a champion"
          //onFocus={this.props.onFocus}
          style={styles.searchBarInput}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor='#99d9f4'
          onPress={this.props.showFreeRotation}>
            <Text style={styles.buttonText}>
              Free
            </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  searchBar: {
    marginTop: 64,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    alignItems: 'center',
  },
  searchBarInput: {
    height: 36,
    fontSize: 18,
    flex: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#eeeeee',
    alignSelf: 'center'
  },
  button: {
    height: 30,
    flex: 1,
    width: 20,
    margin: 3,
    flexDirection: 'row',
    backgroundColor: '#00adb5',
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
});

export default SearchChampion;
