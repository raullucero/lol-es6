import React, { Component } from 'react';
//var HistoryMatch = require('./HistoryMatch.js');
import CellHistory from './CellHistory.js';
import Config from './config/config';

var REQUEST_MATCH_HYSTORY = 'https://lan.api.pvp.net/api/lol/';
var REQUEST_MIDDLE ='/v2.2/matchlist/by-summoner/';

var REQUEST_COMPLEMENT = '?beginIndex=0&endIndex=8&api_key='+ Config.key;

import {
  StyleSheet,
  Text,
  Image,
  NavigatorIOS,
  View,
  TouchableHighlight,
  ListView,
  AlertIOS,
  ScrollView,
} from 'react-native';

class AllHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
     loaded: false,
     rankeds:true,
    }

  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData() {
    var REQUEST_URL = REQUEST_MATCH_HYSTORY + this.props.summoner.region + REQUEST_MIDDLE + this.props.summoner.id + REQUEST_COMPLEMENT ;
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.matches),
        loaded: true,
      });
    })
    .done();
  }

  renderLoadingView() {
    var urlimage = 'http://na.leagueoflegends.com/sites/default/files/styles/scale_xlarge/public/upload/awn53kv.jpg?itok=yj6DliR_';
    if (this.state.rankeds) {
          return (
           <View style={styles.container}>
            <Text>
             Loading Ranked History...
            </Text>
          </View>
     );
    } else{
        return (
          <View style={styles.container}>
            <Image style={styles.image} source={{uri:urlimage}}/>
          </View>
    );
    };



  }

  renderHistory(match): ReactElement {
    return (
       <CellHistory
         onSelect={() => this.selectMatch(match)}
        match={match} />

    );
  }

  render() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }


    return (

      <ScrollView
        scrollEventThrottle={200}
        contentInset={{top: -128}}
        style={styles.scrollView}>
        <ListView
         dataSource={this.state.dataSource}
         renderRow={this.renderHistory}
         keyboardDismissMode="on-drag"
         keyboardShouldPersistTaps={true}/>
      </ScrollView>
    );
  }

}

var styles = StyleSheet.create({

  image: {
    width: 414,
    height: 600,
  },
});

export default AllHistory;
