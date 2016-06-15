import React, { Component } from 'react';
import Config from './config/config';


import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

const REQUEST_CHAMPION ='https://global.api.pvp.net/api/lol/static-data/lan/v1.2/champion/';
const RECUEST_CHAMPION_COMPLEMENT='?champData=image&api_key='+ Config.key;
const REQUEST_IMAGE_CHAMP_SMALL = 'http://ddragon.leagueoflegends.com/cdn/'+ Config.version +'/img/champion/';


class ChampionMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champion: null,
      loaded: false
    }
  }

  componentDidMount(){
    this.fetchDataChamp();
  }

  fetchDataChamp() {

    var urlRequest = REQUEST_CHAMPION + this.props.champion + RECUEST_CHAMPION_COMPLEMENT;
    fetch(urlRequest)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
       champion: responseData,
       loaded: true
      });
    })
    .done();

  }

  renderLoadingView() {
    return (
      <View>
        <Text>
          Loading champions...
        </Text>
      </View>
    );
  }

  render() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }

    var urlImage = REQUEST_IMAGE_CHAMP_SMALL +this.state.champion.image.full;

    return (
      <View>
        <Image
          style={[styles.layoutImage, styles.image]}
          source={{uri: urlImage}}>
          <Text
            style={styles.nestedText}>
            {this.props.gold}
          </Text>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  layoutImage:{
    margin: 5,
    backgroundColor: 'transparent'
  },
  image: {
    width: 60,
    height: 60,
  },
  nestedText: {
    marginLeft: 40,
    marginTop: 40,
    backgroundColor: 'transparent',
    color: '#E6E6E6'
  },
});


export default ChampionMatch;
