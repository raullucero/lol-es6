import React, { Component } from 'react';
import AllHistory from './AllHistory.js';

import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

class SummonerView extends Component {
  render() {
    return (
      <View style={styles.body}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{uri: this.props.summoner.icon}}/>
            <View style={styles.rightContainer}>
              <Text style = {[ styles.simpleText , styles.name]}>{this.props.summoner.name }</Text>
              <Text style = {styles.simpleText}>level {this.props.summoner.summonerLevel}</Text>
            </View>
          </View>
          <AllHistory
            summoner = {this.props.summoner}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  body:{
      backgroundColor:'#eeeeee',
    },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderBottomWidth: 1,
    borderColor: '#303841',
    marginTop: 64
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    fontSize: 30,
    marginBottom: 8,
  },
  simpleText: {
    color: '#303841',
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
});

module.exports = SummonerView;
