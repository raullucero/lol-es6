import React, { Component } from 'react';
import AllChampions from './AllChampions';
import SearchSummoner from'./SearchSummoner.js';


import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

class Menu extends Component {

  onSelectChampions() {
    // console.log(this.props);
    this.props.navigator.push({
      title: 'All Champions',
      component: AllChampions,
    });
  }

  onSelectSummoner() {
    this.props.navigator.push({
      title: 'Summoner',
      component: SearchSummoner,
    });
  }

  render() {

    return (
      <View style={styles.body}>
          <View style={styles.main}>

            <TouchableHighlight style={styles.element} onPress={this.onSelectChampions.bind(this)}>
              <Text style={styles.name}>Champions</Text>
           </TouchableHighlight>

            <TouchableHighlight style={styles.element} onPress={this.onSelectSummoner.bind(this)}>
              <Text style={styles.name}>Summoners</Text>
            </TouchableHighlight>

          </View>
        </View>
    );
  }

}

var styles = StyleSheet.create({

  body:{
    backgroundColor: '#eeeeee',
    height: 800,

  },
  main: {
    marginTop: 80,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'center',
  },

  element: {
    justifyContent: 'center',
    backgroundColor: '#00adb5',
    margin: 10,
    width: 160,
    height: 150,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color:'#eeeeee',
  },

});

export default Menu;
