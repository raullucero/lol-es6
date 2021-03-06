
import React, { Component } from 'react';

import Habilities from './Habilities';
import ChampionDetail from './ChampionDetail';
import Skin from './Skin';

import Config from './config/config';

import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  ListView,
  Text
} from 'react-native';

var REQUEST_CHAMP = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/';
var REQUEST_IMAGE_SKIN = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
var REQUEST_COMPLEMENT = '?champData=all&api_key='+ Config.key;

class Champion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      champInfo: null,
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var FINAL_REQUEST = REQUEST_CHAMP + this.props.champion.id + REQUEST_COMPLEMENT;
    fetch(FINAL_REQUEST)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        champInfo: responseData,
        loaded: true,
        dataSource: this.state.dataSource.cloneWithRows(responseData.spells),
      });
    })
    .done();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading champion...
        </Text>
      </View>
    );
  }

  renderHabilities(spell){
    return (
      <Habilities
        spell={spell}
      />
    );
  }

  render() {
    //var urlSkin = REQUEST_IMAGE_SKIN + this.props.champion.key + '_' + this.props.champion.skins.num + '.jpg';

    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    var keyChamp = this.state.champInfo.key;

    SKINS_IMAGES = [];

    this.state.champInfo.skins.forEach(function(skin){
      var image = REQUEST_IMAGE_SKIN + keyChamp + '_' + skin.num + '.jpg';
      SKINS_IMAGES.push(image);
    });

    //var blurpHTML = eval('this.state.champInfo.blurb');
    this.state.champInfo.title = this.state.champInfo.title.replace(
      /^[a-z]/, function(m){
        return m.toUpperCase()
       }
    );
    return (
      <ScrollView
        style={styles.containerMain}>
        <ScrollView
          scrollEventThrottle={200}
          contentInset={{top: 0}}
          style={styles.scrollView}
          horizontal={true} >
          {SKINS_IMAGES.map(createSkinRow)}
        </ScrollView>
        <Text style={styles.name}>
          {this.state.champInfo.name}
        </Text>

        <Text style={styles.title}>
          {this.state.champInfo.title}
        </Text>
        <Text style={styles.sections}>
          Habilities
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderHabilities}
          style={styles.listView}
          automaticallyAdjustContentInsets={false}/>

      </ScrollView>

    );
  }

}

var createSkinRow = (uri, i) => <Skin key={i} uri={uri} />;

var styles = StyleSheet.create({

  containerMain: {
    backgroundColor: '#eeeeee',
    marginTop: 65,
  },
  scrollView: {
    backgroundColor: '#eeeeee',
    height: 260,
  },
  name: {
    fontSize: 26,
    marginTop: 7,
    color: '#303841',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 11,
    color: '#303841',
    textAlign: 'center',
    paddingBottom: 6,
  },
  sections: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 3,
    marginBottom: 5,
    color: '#303841',
    textAlign: 'center',
  },
});


export default Champion;
