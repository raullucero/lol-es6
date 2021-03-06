import React, { Component } from 'react';

import Config from './config/config';

var REQUEST_RUNE = 'https://global.api.pvp.net/api/lol/static-data/lan/v1.2/rune/';
var REQUEST_RUNE_COMPLEMENT = '?locale=es_ES&version='+ Config.version +'&runeData=image&api_key='+ Config.key;

var REQUEST_IMAGE_RUNE = 'http://ddragon.leagueoflegends.com/cdn/'+Config.version+'/img/rune/';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

class RuneMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      runeUsed:null,
    }
  }

  //PARA OBTENER LOS DATOS DE IMGAEN RUNA
  fetchDataRune() {
    var urlRequest = REQUEST_RUNE +this.props.rune.runeId + REQUEST_RUNE_COMPLEMENT;
    fetch(urlRequest)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
       runeUsed: responseData,
       loaded: true
      });
    })
    .done();
  }

  renderLoadingView() {
    this.fetchDataRune();
    return (
      <View style={styles.container}>
        <Text>
          Loading Runes ...
        </Text>
      </View>
    );
  }

  render() {
      if(!this.state.loaded){
      return this.renderLoadingView();
    }
    urlImge = REQUEST_IMAGE_RUNE + this.state.runeUsed.image.full;
    return (

          <View style={[styles.container, styles.ligthBlue]}>
            <Image
              style={[styles.image , styles.layoutImage]}
              source={{uri: urlImge}}/>
            <Text style={[ styles.simpleText]}> X {this.props.rune.rank}</Text>
            <View style={[styles.rightContainer]}>
              <Text style={[ styles.simpleText]}>{this.state.runeUsed.name}</Text>
              <Text style={[ styles.simpleText]}>
                {this.state.runeUsed.description}
              </Text>
            </View>
          </View>

    );
  }
}

var styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 5,
  },
  ligthBlue:{
    backgroundColor: '#eeeeee',
  },
  simpleText:{
    color:'#303841'
  },
  image: {
    width: 65,
    height: 65,
  },
  layoutImage:{
    marginLeft: 5,
    backgroundColor: 'transparent'
  },
});

module.exports = RuneMatch;
