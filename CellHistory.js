import React, { Component } from 'react';
import RuneMatch from './RuneMatch';
import Config from './config/config';
import ChampionMatch from'./ChampionMatch';

var REQUEST_MATCH = 'https://global.api.pvp.net/api/lol/lan/v2.2/match/';
var REQUEST_MATCH_MIDDLE = '?api_key=' + Config.key;

var REQUEST_IMAGE_ITEM = 'http://ddragon.leagueoflegends.com/cdn/'+ Config.version +'/img/item/';
var urlImageIcons_minions= 'http://ddragon.leagueoflegends.com/cdn/6.11.1/img/ui/minion.png'; // estos iconos estan
var urlImageIcons_gold = 'http://ddragon.leagueoflegends.com/cdn/6.11.1/img/ui/gold.png';  // solo hasta la vercion
var urlImageIcons_KDA= 'http://ddragon.leagueoflegends.com/cdn/6.11.1/img/ui/score.png';   // 5.2.1


import {
  View,
  LayoutAnimation,
  Text,
  Image,
  ScrollView,
  ListView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class CellHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champion: null,
      loaded: false,
      touched:false,
      index: 0,
      dataSourceRune: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  }

  componentDidMount(){
    this.fetchDataMatch();
  }
  //PARA OBTENER LOS DATOS DE IMGAEN CAMPEON


  fetchDataMatch() {
    fetch(REQUEST_MATCH + this.props.match.matchId + REQUEST_MATCH_MIDDLE)
    .then((response) => response.json())
    .then((responseData) => {

      let _i = 0;
      responseData.participants.forEach((participant, _index) => {
        if(participant.championId === this.props.match.champion) {
          _i = _index;
        }
      });

      this.setState({
        matchDetail: responseData,
        loaded: true,
        index: _i,
      });

    })
    .done();

  }
  //Funcion de REdondeo
  roundGoldEarned(gold){
   var goldOriginal = parseFloat(gold/Math.pow(10,3));
   var goldconvert = Math.round(goldOriginal*Math.pow(10,1))/Math.pow(10,1);
       goldconvert = goldconvert + 'K';
    return goldconvert;
  }

  roundTime(time){
    var minutes = Math.floor( time / 60 );
    var seconds = time % 60;

    //Anteponiendo un 0 a los minutos si son menos de 10
    minutes = minutes < 10 ? '0' + minutes : minutes;

    //Anteponiendo un 0 a los segundos si son menos de 10
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var result = minutes + ":" + seconds;  // mm:ss
    return result;
  }

  imageItem(itemId){
    var url = 'http://promo.na.leagueoflegends.com/assets/snowdown-2014/img/game-mode/icon-2.png';
    if (itemId != 0){
      url =  REQUEST_IMAGE_ITEM + itemId + '.png';
      return url;
    }
    return url
  }

  renderLoadingView() {
    return (
      <View style={styles.renderLoad}>
        <Text>
          Loading Match History...
        </Text>
      </View>
    );
  }

  renderRowRune(rune): ReactElement {
    return (
       <RuneMatch

        rune={rune} />

    );
  }

  _onPressDetails() {
    this.setState({
      dataSourceRune: this.state.dataSourceRune.cloneWithRows(this.state.matchDetail.participants[this.state.index].runes),
    });
    //segun esto es una animacion, tomado de ract-native Examples UiExplorer ListView
    var config = layoutAnimationConfigs[20 % 3];
    LayoutAnimation.configureNext(config);
   //una ves precionado cambiamos la variable de estado para mostrar los detalles
    this.setState({
      touched: this.state.touched === true ? false : true,
    });
  }

  render() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    urlItemImge1 = this.imageItem(this.state.matchDetail.participants[this.state.index].stats.item1);
    urlItemImge2 = this.imageItem(this.state.matchDetail.participants[this.state.index].stats.item2);
    urlItemImge3 = this.imageItem(this.state.matchDetail.participants[this.state.index].stats.item3);
    urlItemImge4 = this.imageItem(this.state.matchDetail.participants[this.state.index].stats.item4);
    urlItemImge5 = this.imageItem(this.state.matchDetail.participants[this.state.index].stats.item5);
    urlItemImge6 = this.imageItem(this.state.matchDetail.participants[this.state.index].stats.item6);
    urlItemImge7 = this.imageItem(this.state.matchDetail.participants[this.state.index].stats.item7);

    //Para mostrar si gano o no
    matchStatus = 'Defeat';
    if(this.state.matchDetail.participants[this.state.index].stats.winner){
     matchStatus = 'Victory';
    }
    //para obtener de forma reducida el oro
    gold = this.roundGoldEarned(this.state.matchDetail.participants[this.state.index].stats.goldEarned);
    duration = this.roundTime(this.state.matchDetail.matchDuration);
    return (
        <TouchableOpacity onPress={this._onPressDetails.bind(this)}>
          <View>
            <View style={[styles.container , styles.ligthBlue]}>
              <ChampionMatch
                champion={this.props.match.champion}
                gold={gold}
                />
              <View style={styles.rightContainer}>

               { matchStatus === 'Victory' ?
                <Text style={[styles.simpleText,styles.victoryText]} >
                  {matchStatus}
                 </Text> :
                 <Text />
                }
                { matchStatus === 'Defeat' ?
                <Text style={[styles.simpleText,styles.defeatText]} >
                  {matchStatus}
                 </Text> :
                 <Text />
                }

              <Text style={[styles.simpleText , styles.durationText]}>
                    {duration}
              </Text>
              </View>
              <View style={styles.CenterContainer}>
                <View style={styles.iconContainer}>
                  <Image
                     style={styles.iconimage}
                     source={{uri: urlImageIcons_KDA}}/>
                  <Text style={styles.simpleText} > {this.state.matchDetail.participants[this.state.index].stats.kills} / {this.state.matchDetail.participants[this.state.index].stats.deaths} / {this.state.matchDetail.participants[this.state.index].stats.assists} </Text>
                </View>
                <View style={styles.itemContiner}>
                  <Image
                  style={styles.itemimage}
                  source={{uri: urlItemImge1}}/>
                  <Image
                  style={styles.itemimage}
                  source={{uri: urlItemImge2}}/>
                  <Image
                  style={styles.itemimage}
                  source={{uri: urlItemImge3}}/>
                  <Image
                  style={styles.itemimage}
                  source={{uri: urlItemImge4}}/>
                  <Image
                  style={styles.itemimage}
                  source={{uri: urlItemImge5}}/>
                  <Image
                  style={styles.itemimage}
                  source={{uri: urlItemImge6}}/>
                  <Image
                  style={styles.itemimage}
                  source={{uri: urlItemImge7}}/>
                </View>
                 <View style={styles.iconsContainer}>
                  <View style={styles.iconContainer}>
                   <Image
                     style={styles.iconimage}
                     source={{uri: urlImageIcons_minions}}/>
                   <Text style={[styles.simpleText , styles.iconText]} > {this.state.matchDetail.participants[this.state.index].stats.minionsKilled} </Text>
                  </View>
                  <View style={styles.iconContainer}>
                   <Image
                     style={styles.iconimage}
                     source={{uri: urlImageIcons_gold}}/>
                   <Text style={[ styles.simpleText , styles.iconText]}> {gold} </Text>
                  </View>
                </View>
              </View>
            </View>
            {this.state.touched === true ?
              <View>
               <View style={[styles.CenterContainer, styles.ligthBlue]}>
                <Text style={[styles.simpleText]}>
                  Total Daño Recibido : {this.state.matchDetail.participants[this.state.index].stats.totalDamageTaken}
                </Text>
                <Text style={[styles.simpleText]}>
                  Total Daño Repartido : {this.state.matchDetail.participants[this.state.index].stats.totalDamageDealt}
                </Text>
                <Text style={[styles.simpleText]}>
                  Total Daño Verdadero Repartido : {this.state.matchDetail.participants[this.state.index].stats.trueDamageDealt}
                </Text>
                <Text style={[styles.simpleText]}>
                  Total Daño Fisico Repartido : {this.state.matchDetail.participants[this.state.index].stats.physicalDamageDealt}
                </Text>
                <Text style={[styles.simpleText]}>
                  Total Daño Magico Repartido : {this.state.matchDetail.participants[this.state.index].stats.magicDamageDealt}
                </Text>
                <Text style={[styles.simpleText]}>
                  Multi Kill Mas Larga : {this.state.matchDetail.participants[this.state.index].stats.largestMultiKill}
                </Text>
                <Text style={[styles.simpleText]}>
                  Wards Colocados: {this.state.matchDetail.participants[this.state.index].stats.wardsPlaced}
                </Text>
              </View>
              <ListView
                dataSource={this.state.dataSourceRune}
                renderRow={this.renderRowRune}
                contentInset={{top: -65}}
                style={styles.runelist}/>
              </View> :
              <View/>
            }
          </View>

        </TouchableOpacity>

    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#303841',
  },
  ligthBlue:{

    backgroundColor: '#eeeeee',
  },
  simpleText:{
    color:'#303841'
  },
  victoryText:{
    backgroundColor:'green',
    color:'#eeeeee'

  },
  defeatText:{
    backgroundColor:'red',
    color:'#eeeeee'
  },
  durationText:{
    marginRight:5,
  },
  iconsContainer:{
    flexDirection: 'row',
    alignItems:'stretch',
  },
  iconContainer:{
    flexDirection: 'row',
    alignItems:'stretch',
  },
  itemContiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
   renderLoad :{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    marginTop: 184
   },
  CenterContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flex: .2,
    alignItems: 'center',
  },
  layoutImage:{
    backgroundColor: 'transparent'
  },
  image: {
    width: 60,
    height: 60,
  },
  itemimage: {
    width: 30,
    height: 30,
  },
  iconimage:{
    width: 21,
    height: 22,
    margin: 1
  },
  iconText:{
    fontSize: 12,
  },
  nestedText: {
    marginLeft: 40,
    marginTop: 40,
    backgroundColor: 'transparent',
    color: '#303841'
  },
});
//**************[Variables de Animacion]********************************
var animations = {
  layout: {
    spring: {
      duration: 750,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.4,
      },
    },
    easeInEaseOut: {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};
var layoutAnimationConfigs = [
  animations.layout.spring,
  animations.layout.easeInEaseOut,
];
// ***********************************************************************
module.exports = CellHistory;
