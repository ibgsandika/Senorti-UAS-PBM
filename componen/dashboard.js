/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  ListView, 
} from 'react-native';
import { Container, Header, Content, Icon, Item } from 'native-base';
import Drawer from 'react-native-drawer';
import Swiper from 'react-native-swiper';
var{width,height}=Dimensions.get('window');

export default class Dashboard extends Component<{}> {
   
   static navigationOptions = {
      header : null
  };
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  constructor(props) {
    super(props);
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['SENORTI, Aplikasi masa kini dalam penyampaian informasi', 'row 2']),
    };
  }


  render() {
     
         const { navigate } = this.props.navigation;
    return (
      
     <Drawer
      ref={(ref) => this._drawer = ref}
      type="overlay"
      content={
        <View style={{width : width/1.5, height : height, backgroundColor : '#ffa342'}}>
            
            <View style={{marginBottom:30, flexDirection : 'column',}}> 
              <TouchableOpacity style={{height: 110, width: 75,marginTop:30, marginLeft:75,}} onPress={()=>navigate('Login')}>
                <Image style={styles.profilIcon} source={require('./../img/profil.png')} style={styles.profil}/>
              </TouchableOpacity>
            </View>
            
          <View style={{ flexDirection : 'column',}}>

                    <View style={{flexDirection:'row', width:width/1.5,height:100}} style={styles.inputSearch}>
                          
                          <Item>
                          <TextInput underlineColorAndroid='transparent' placeholderTextColor='#a5a5a5' style={styles.Input} 
                          placeholder='Search journalist'/>
                          <TouchableOpacity style={{height:30, width:70, marginLeft:80, marginTop:5}}>
                          <Icon active name='search' style={{marginLeft:20}}/>
                          </TouchableOpacity>
                          </Item>
                      </View>

            <TouchableOpacity style={{height : 50, width : width/1.5,}} onPress={()=>navigate('Login')}>
            <View style={{flex : 1, flexDirection : 'row',}}>
                  <Image source={require('./../img/iconstreet.png')} style={styles.pilImage}>
                  </Image> 
              <Text style={styles.pil1text}>
                  SenStreet
              </Text>
            </View>
            </TouchableOpacity>
            

            <TouchableOpacity style={{height : 50, width : width/1.5,}} onPress={()=>navigate('Login')}>
              <View style={{flex : 1, flexDirection : 'row',}}>
                  <Image source={require('./../img/sporticon.png')} style={styles.pilImage}>
                  </Image> 
                <Text style={styles.pil1text}>
                  SenSport
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{height : 50, width : width/1.5, }} onPress={()=>navigate('Login')}>
                <View style={{flex : 1, flexDirection : 'row', }}>
                  <Image source={require('./../img/sencana.png')} style={styles.pilImage}>
                  </Image> 
                <Text style={styles.pil1text}>
                  SenCana
                </Text>
                </View>
            </TouchableOpacity>          

            <TouchableOpacity style={{height : 50, width : width/1.5, }} onPress={()=>navigate('Login')}>
                <View style={{flex : 1, flexDirection : 'row', }}>
                  <Image source={require('./../img/senfood.png')} style={styles.pilImage}>
                  </Image>
                <Text style={styles.pil1text}>
                  SenFood
                </Text>
                </View>
            </TouchableOpacity>
          
            <TouchableOpacity style={{height : 50, width : width/1.5, }} onPress={()=>navigate('Login')}>
                <View style={{flex : 1, flexDirection : 'row', }}>
                  <Image source={require('./../img/senevent.png')} style={styles.pilImage}>
                  </Image>
                <Text style={styles.pil1text}>
                  SenEvent
                </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{height : 50, width : width/1.5, }} onPress={()=>navigate('Loginjur')}>
                <View style={{flex : 1, flexDirection : 'row', }}>
                  <Icon active name='paper-plane' style={{marginLeft:10, marginTop: 10, color:'white'}}/>
                <Text style={styles.pil1text}>
                  Be a journalist
                </Text>
                </View>
            </TouchableOpacity>
          </View>
      </View>
         }
      tapToClose={true}
      openDrawerOffset={0.2} // 20% gap on the right side of drawer
      panCloseMask={0.2}
      closedDrawerOffset= {-3}
      styles={drawerStyles}
      tweenHandler={(ratio) => ({
        main: { opacity:(2-ratio)/2 }
      })}
      >
    
    <View style={{width : width, height : height, backgroundColor : 'white'}}>
         <View style={{ flexDirection:'row', backgroundColor:'#ffa342', height:50, width:width}}>
            <TouchableOpacity style={{height : 85, width : 80, marginLeft : 10, marginTop : 5,}} activeOpacity={0.3} onPress={()=>this.openControlPanel()}>
                <Image style={styles.button} source={require('./../img/menu.png')} style={styles.drawerImage}/>
            </TouchableOpacity>
            <Image source={require('./../img/text.png')} style={styles.kopImage}/>
          </View>
    
    <View style={{height:200, width:width}}>
      <Swiper style={styles.wrapper} autoplay={true} showsButtons={true}>
        <View style={{width:100, height:20}} style={styles.slide1}>
          <Image source={require('./../img/senorti2.png')} style={styles.swiper}/>
        </View>
        <View style={styles.slide2}>
        <View style={{width:100, height:20}} style={styles.slide1}>
          <Image source={require('./../img/senstreet.png')} style={styles.swiper}/>
        </View>
        </View>
        <View style={styles.slide3}>
        <View style={{width:100, height:20}} style={styles.slide1}>
          <Image source={require('./../img/senall.png')} style={styles.swiper}/>
        </View>
        </View>
      </Swiper>
    </View>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => 
        <TouchableOpacity style={{height : 70, width : width,marginLeft:5, marginBottom:5, backgroundColor:'#eaeaea' }}> 
        <View style={{flex : 1, flexDirection : 'row',}}>
        <Image source={require('./../img/log.jpg')} style={styles.listImage}/>
        <Text style={styles.listText}>
        {rowData}
        </Text>
        </View>
        </TouchableOpacity>
      }/>
    
        </View>
    </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20, textAlign: 'center', margin: 10,
  },
  instructions: {
    textAlign: 'center', color: '#333333', marginBottom: 5,
  },
    searchButton: {
      position: 'absolute', alignSelf: 'stretch', width:2, justifyContent: 'center', height:3,
  },
  Button:
  {
    position: 'absolute', top: 40, bottom: 10, alignSelf: 'center',
  },
  
  drawerImage:
  {
      alignSelf: 'stretch', width:40, height:40,
  },

  profilImage:
  {
    height:160, width:260,
  },
  pil1text:
  {
      fontSize : 15, marginTop: 15,
      marginLeft: 5, color: 'white', textShadowColor: '#252525',
      textShadowOffset: {weidth: 1, height: 1}, fontWeight: 'bold', fontStyle: 'italic',
  },
  pilImage:
  {
    marginTop: 10, marginLeft: 10, width: 30, height: 30,
  },
  profilIcon:
  {
  alignSelf:'center',
  },
  profil:
  {
    marginTop:30, width:75, height:75,
  },
   wrapper: {
  },
  koptext:
  {
      fontSize : 30, marginTop: 10, marginLeft: 20, color: '#ffff6b',
      textShadowColor: '#252525', textShadowOffset: {weidth: 2, height: 2},
      textShadowRadius: 10, fontWeight: 'bold', fontStyle: 'italic',
  },
  kopImage:
  {
    width:160, height:35, alignSelf:'center', marginTop:5, marginLeft:10,
  },
  swiper:
  {
    width:width, height:200
  },
      inputSearch: 
    {
      height:40, backgroundColor:'white', borderWidth: 1, borderColor:'white',
    },
    Input:
    {
      width:110, fontSize: 13, fontStyle: 'italic', color:'black',
    },
    listImage:
    {
      height:55, width: 80, marginLeft: 10, marginTop:8,
    },
    listText:
    {
      fontStyle: 'italic', color:'black', fontWeight:'bold', marginLeft: 5, marginTop:5,
    }


});
