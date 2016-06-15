import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';

import Menu from './Menu';
import Champion from './Champion';
import CellChampion from './CellChampion';
import SearchChampion from './SearchChampion';
import NoChamps from './NoChamps';

import Config from './config/config';

import champions from './data/champions';


var REQUEST_URL = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key=' + Config.key;
var REQUEST_FREE_ROTATION = 'https://na.api.pvp.net/api/lol/na/v1.2/champion?freeToPlay=true&api_key='+ Config.key;

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  ListView,
  AlertIOS
} from 'react-native';


class AllChampions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      filter: '',
      jChampions: null,
      jFreeRotation: null,
      jChampionsSearch: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

  }

  componentDidMount(){
    this.fetchData();
    // console.log(REQUEST_URL);
  }

  fetchData() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      // console.log(responseData);
      // console.log(this.state);

      this.setState(
        {
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          jChampions: responseData.data,
          loaded: true
        }
      );
    })
    .done();

    fetch(REQUEST_FREE_ROTATION)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        jFreeRotation: responseData.champions
      });
    }).done();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading champions...
        </Text>
      </View>
    );
  }

  selectChampion(champion) {
    this.props.navigator.push({
      title: champion.name,
      component: Champion,
      passProps: {champion},
    });
  }

  renderRow(champion) {
    return (
      <CellChampion
        onSelect={() => this.selectChampion(champion)}
        champion={champion}
        filter={this.state.filter}
      />
    );
  }

  onSearchChange(event) {
    var filter = event.nativeEvent.text.toLowerCase();
    this.setState({
      filter: filter,
    });
    this.timeoutID = setTimeout(() => this.searchingChampion(filter), 100);


    //console.log(this.state.filter);
  }

  searchingChampion() {
    var arrayChamps = {};

    if(this.state.filter.length > 0){
      this.state.filter = this.state.filter.toLowerCase();

      for(var champion in this.state.jChampions){
        //console.log(champion);
        var nchampion = champion.toLowerCase();
        if(nchampion.indexOf(this.state.filter) !== -1){
          //console.log('entro');
          arrayChamps[champion] = this.state.jChampions[champion];
        }
      }
      //console.log(arrayChamps);
      this.setState({
        jChampionsSearch: this.state.dataSource.cloneWithRows(arrayChamps),
      });

    }else if(this.state.filter.length === 0){
      this.setState({
        jChampionsSearch: this.state.dataSource,
      });
    }
    //console.log(arrayChamps);
  }

  showFreeRotation(){
    var freeChamps = {};
    // console.log(this.state.jFreeRotation);
    var self = this;
    this.state.jFreeRotation.forEach(function(champ) {
      // console.log(champ);
      // console.log(champions[champ.id]);
      freeChamps[champions[champ.id]] = self.state.jChampions[champions[champ.id]]
    });

    this.setState({
      jChampionsSearch: this.state.dataSource.cloneWithRows(freeChamps),
    });

  }

  render() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    // return this.renderLoadingView();

    var content = this.state.jChampionsSearch.getRowCount() === 0 && this.state.filter.length === 0 ?
      <ListView
        ref="listview"
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false} /> : this.state.jChampionsSearch.getRowCount() > 0 ?
      <ListView
        ref="listview"
        dataSource={this.state.jChampionsSearch}
        renderRow={this.renderRow.bind(this)}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false} /> :
      <NoChamps
        filter={this.state.filter} />;

    //console.log(this.state.jChampions);
    return (
      <View
        style={styles.containerScroll}>
        <SearchChampion
          onSearchChange={this.onSearchChange.bind(this)}
          showFreeRotation={this.showFreeRotation.bind(this)} />
        <View style={styles.separator} />
        {content}
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: '#eeeeee',
  },
  containerNoChamp: {
    flex: 1,
  },
  containerScroll: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  centerText: {
    alignItems: 'center',
  },
});

export default AllChampions;
