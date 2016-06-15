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

            <TouchableHighlight style={styles.container} onPress={this.onSelectChampions.bind(this)}>
              <Text style={styles.name}>Champion</Text>
           </TouchableHighlight>

            <TouchableHighlight style={styles.containerBottom} onPress={this.onSelectSummoner.bind(this)}>
              <Text style={styles.name}>Summoner</Text>
            </TouchableHighlight>

          </View>
        </View>
    );
  }

}

var styles = StyleSheet.create({

  body:{
    backgroundColor:'#000000',
    height: 800,

  },
  main:{
    marginTop: 120,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#051980',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#0C33F4',
    margin: 5,
    borderRadius: 12,
    height: 200,

  },
  containerBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#051980',
    marginTop: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#0C33F4',
    borderRadius: 12,
    height: 200,
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color:'white',
    fontSize: 36,
  },

});

export default Menu;
