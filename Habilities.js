import React, { Component } from 'react';
import Config from './config/config';

import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

var REQUEST_IMAGE_SPELL = 'http://ddragon.leagueoflegends.com/cdn/'+ Config.version +'/img/spell/'


class Habilities extends Component {
  render() {
    var urlImage = REQUEST_IMAGE_SPELL + this.props.spell.image.full;

    return (
      <View style={styles.wrapperContainer}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{uri: urlImage}}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.name}>{this.props.spell.name}</Text>
            <Text style={styles.cost}>
              {this.props.spell.costType}: {this.props.spell.costBurn}
            </Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.textDescription}>   {this.props.spell.description}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    margin: 4,
  },
  wrapperContainer: {
    borderBottomWidth: 1,
    borderColor: '#303841',
  },
  name: {
    fontSize: 18,
    paddingLeft: 8,
    color: '#303841',
  },
  cost: {
    fontSize: 12,
    color: '#303841',
    paddingLeft: 8,
    paddingTop: 4,
    fontStyle: 'italic',
  },
  description: {
    flex: 1,
    paddingLeft: 4,
    paddingBottom: 4,

  },
  textDescription: {
    fontSize: 12,
    color: '#303841',
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  image: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderColor: '#BDBDBD',
  },
});

export default Habilities;
