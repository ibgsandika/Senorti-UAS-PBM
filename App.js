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

var{width,height}=Dimensions.get('window');

import Dashboard from './componen/dashboard';
import Login from './componen/login';
import Loginjur from './componen/loginjur';

export default class App extends Component {
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
    <View style={{height: height, width: null, backgroundColor:"green", flex:1,alignItems:'center', justifyContent:'center'}}>
       <Login navigation={navigation}/>
     {/* <Demo />*/}  
    </View>
     
    );
  }
}
const maziNavigation = StackNavigator({
  Home : {screen : Login},
  Dashboard :{screen:Dashboard},
  Loginjur : {screen : Loginjur},
});
AppRegistry.registerComponent('App', () => maziNavigation);
