/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
   NativeModules,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Button,
  StatusBar,
  Dimensions,
  View,
  Modal
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA-IY13VJofzFp3-1IPwtI47d6JeJimX_Y",
  authDomain: "senorti-d95fc.firebaseapp.com",
  databaseURL: "https://senorti-d95fc.firebaseio.com",
  projectId: "senorti-d95fc",
  storageBucket: "senorti-d95fc.appspot.com",
  messagingSenderId: "887734914733"
  };   
  const firebaseApp = firebase.initializeApp(config);

var{width,height}=Dimensions.get('window');

import Dashboard from './componen/dashboard';
import Signin from './componen/signin';
import Login from './componen/login';
import Inputnews from './componen/inputnews';
import Profil from './componen/profil';
import Viewnews from './componen/viewnews';
import Senstreet from './componen/senstreet';
export default class senorti extends Component {
  static navigationOptions = {
      header : null
  };

  constructor(props){
    super(props);
    
  }
  render() {
     const { navigation } = this.props;
     const { navigate } = this.props.navigation;
    return (
    <View >
       <Firstpage navigation={navigation}/> 
    </View>
     
    );
  }
}
const senortiNavigation = StackNavigator({
  
  Home : {screen : Login},
  Dashboard :{screen:Dashboard},
  Signin :{screen:Signin},
  Inputnews : {screen: Inputnews},
  Profil : {screen: Profil},
  Viewnews : {screen : Viewnews},
  Senstreet : {screen : Senstreet},
});
AppRegistry.registerComponent('senorti', () => senortiNavigation);
