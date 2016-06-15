import React, { Component } from 'react';

import Region from './config/region';
import RegionView from './RegionView.js';
import SummonerView  from './SummonerView.js';

import Config from './config/config';

import {
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput,
  AlertIOS,
  Text
} from 'react-native';


var REQUEST_SUMMONER = 'https://lan.api.pvp.net/api/lol/';
var REQUEST_MIDDLE = '/v1.4/summoner/by-name/';
var REQUEST_COMPLEMENT = '?api_key=' + Config.key;


var API_SUMMONER_ICON = 'http://ddragon.leagueoflegends.com/cdn/'+ Config.version +'/img/profileicon/';
var SUMMONER_BASIC_DATA = {};

class SearchSummoner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      summoner: null,
      inputValue: '',
      region: 'lan'
    }
  }

	fetchData(input, region) {
		var urlRequest = REQUEST_SUMMONER + region +REQUEST_MIDDLE + this.state.inputValue + REQUEST_COMPLEMENT;
  			fetch(urlRequest)
    		.then((response) => response.json())
    		.then((responseData) => {
      			this.setState({
       				summoner: responseData,
        			loaded: true,
      			});
    		})
    .done();
  }

	search(){
		if(this.state.inputValue === ''){
			AlertIOS.alert(
           	 'No Summoner',
           	 'Dude Escribe el Nombre del Summoner'
          )
		} else {
			this.fetchData(this.state.inputValue, this.state.region);
		}

	}

	updateText(text) {
		this.setState({
			inputValue: text,
		});
	}

	navigateToRegionView(callback){
		var currency = Region.currency;
		var self = this;
		self.props.navigator.push({
			title: "Region",
			component: RegionView,
			passProps:{currency:currency, onSelect : callback },
		});
	}

	handleRegionButtonPressed() {
		var self = this;
		this.navigateToRegionView(function(key){
			self.state.region = key
		});
	}

	renderStaticView() {
		return (
			<View style = {styles.body}>
				<View style = {styles.main}>
					<View style = {styles.container}>
						<TextInput
							style={styles.textInput}
							onChange={
								(event) => this.updateText(
									event.nativeEvent.text
	          					)
							}/>
						<TouchableHighlight style={styles.buttonContainer} onPress={this.handleRegionButtonPressed.bind(this)}>
					    	<Text style={styles.buttonText}>{this.state.region}</Text>
					  	</TouchableHighlight>

						<TouchableHighlight style={styles.buttonContainer} onPress={this.search.bind(this)}>
							<Text style={styles.buttonText}>GO!</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		);
	}

	renderSummonerView(summoner){
    var obj
    for(var key in summoner) {
      obj = summoner[key];
    }

		SUMMONER_BASIC_DATA.id = obj.id;
		SUMMONER_BASIC_DATA.name = obj.name;// esta dado desde el input
		SUMMONER_BASIC_DATA.region = this.state.region;//esta dada desde el imput
		SUMMONER_BASIC_DATA.icon = API_SUMMONER_ICON + obj.profileIconId+".png";
		SUMMONER_BASIC_DATA.summonerLevel = obj.summonerLevel;
  	return (
      		<SummonerView
        			summoner = {SUMMONER_BASIC_DATA}/>
        		);
  }

	render() {
		if(!this.state.loaded){
			return this.renderStaticView();
		}
    
  	return this.renderSummonerView(this.state.summoner);
  }
}

var styles = StyleSheet.create({

	body:{
    	backgroundColor:'black',
    	height: 800,
  },
  buttonContainer : {
		flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#051980',
    marginTop: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#0C33F4',
    borderRadius: 8,
    height: 55,
	},
	buttonText: {
		fontSize: 22,
		fontWeight: 'bold',
		color: 'white',
	},
	container: {
		flex: 1,
		padding: 16,
	},
	main: {
		marginTop : 200
	},
	textInput: {
		height: 40,
		marginBottom: 10,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: '#BABABA',
		padding: 4,
		fontSize: 20,
		backgroundColor: 'white',
	}
});

export default SearchSummoner;
