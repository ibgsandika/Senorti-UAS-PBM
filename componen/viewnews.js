import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import { Container, Header,Card, CardItem,  Thumbnail , Content, Icon, Item, } from 'native-base';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
var{width,height}=Dimensions.get('window');

export default class Profil extends Component {

     static navigationOptions = {
      header : null
  };

  render() {
    
  
     const { navigate } = this.props.navigation;
  
     return (
      <View style={{flexDirection:'column', backgroundColor:'#ffefcc' ,height:height, width:width}}>
      <View style={{ flexDirection:'row', backgroundColor:'#ffefcc', height:50, width:width,}}>
      <Text style={{ color: '#ffff6b', marginTop:5,
      fontStyle: 'italic',
      fontWeight: 'bold',
      textShadowColor: '#252525',
      textShadowOffset: {weidth: 1, height: 1},
      textShadowRadius: 8,
      marginBottom: 20,
      height:40, width:140,
      fontSize: 25, marginLeft:120}}>
          NEWS
      </Text>
          <Item>
            <TouchableOpacity style={{height:30, width:70, marginLeft:20, marginTop:5}}>
              <Icon active name='settings' style={{marginLeft:40, color:'#f48f42'}}/>
            </TouchableOpacity>
          </Item>
      </View>
      <Image source={{uri : this.props.navigation.state.params.uri}} style={{width:width, height:150}}/>
      <CardItem cardBody style={{borderColor:'#dbdbdb', borderWidth:1, width:width}}>                       
      <View style={{flexDirection:'column', marginLeft: 10, marginTop:5 }}>
          <Text style={{marginTop:5}}>{this.props.navigation.state.params.username}</Text>
          <Text style={{fontSize:10, marginTop:5}}>{this.props.navigation.state.params.date}</Text>
          
          <Text  style={{marginTop:5,fontWeight:'bold',fontSize:20}}>
          {this.props.navigation.state.params.title}
          </Text>
          <Text editable = {true}   multiline = {true}  style={{fontSize:15}}>
         {this.props.navigation.state.params.description}
         </Text>
      </View>
      </CardItem>
                  
      </View>

);
  }
}

const styles = StyleSheet.create({

});
