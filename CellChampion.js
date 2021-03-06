import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';

var REQUEST_IMAGE_CHAMP_SMALL = 'http://ddragon.leagueoflegends.com/cdn/6.11.1/img/champion/';

class CellChampion extends Component {
  render() {
    var urlImage = REQUEST_IMAGE_CHAMP_SMALL + this.props.champion.image.full;

    this.props.champion.title = this.props.champion.title.replace(
      /^[a-z]/, function(m){
        return m.toUpperCase()
       }
    );

    return (
      <View>
        <TouchableHighlight onPress={this.props.onSelect}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{uri: urlImage}}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.name}>{this.props.champion.name}</Text>
              <Text style={styles.title}>{this.props.champion.title}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#303841',
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    color: '#303841',
    marginBottom: 8,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#303841',
  },
  image: {
    width: 60,
    height: 60,

  },
});

export default CellChampion;
