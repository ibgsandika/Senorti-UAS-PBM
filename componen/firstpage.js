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
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
var{width,height}=Dimensions.get('window');
export default class Firstpage extends Component {
   static navigationOptions = {
      header : null
  };

  render() {
  
     const { navigate } = this.props.navigation;
    return (
      <Image source={require('./../img/FLASH.png')} style={styles.backgroundImage}> 

        <View style={styles.logo}>
                        <Image source={require('./../img/logo1.png')} style={styles.logoImage}>
                        </Image>
        
        </View>        
        <View style={{flex : 1, flexDirection : 'row', marginLeft : 1, marginRight : 2, marginTop : 500, marginLeft : 10, alignSelf : 'center',}}>
          <TouchableOpacity style={{height : 150, width : 120, marginLeft: 5,}} onPress={()=>navigate('Login')}>
          <View style={styles.userbutton}>
              <Text style={styles.usertext}>
                Login ass User
              </Text>
          </View>
        </TouchableOpacity>

          <TouchableOpacity style={{height : 150, width : 150,}} onPress={()=>navigate('Loginjur')}>
          <View style={styles.jurbutton}>
              <Text style={styles.jurtext}>
                Login ass Journalist
              </Text>
          </View>
        </TouchableOpacity>

        </View>
      </Image>

   );
  }
}
  const styles = StyleSheet.create({
  backgroundImage: {
      marginTop : 0,
      alignSelf: 'stretch',
      width:width,
      justifyContent: 'center',
      height:height,
    },
  logo: {
      position: 'absolute',
      top: 100,
      bottom: 10,
    alignSelf: 'center',
  },
  logoImage: {
      alignSelf: 'stretch',
      width:225,
      justifyContent: 'center',
      height:167,
  },
  userbutton: {
       marginTop: 10,
      borderWidth: 1,
      backgroundColor:'#ffe2af',
      height: 40,
      width: 120,
      borderColor:'#ffa200',
      alignItems: 'center',
      justifyContent: 'center',
  },
  usertext: {
      color: '#f7b738',
      fontWeight: 'bold',
      textShadowColor: '#252525',
      textShadowOffset: {weidth: 1, height: 1},
      textShadowRadius: 4,
      fontStyle: 'italic',
      textAlign: 'center',
  },

  jurbutton: {
       marginTop: 10,
      borderWidth: 1,
      backgroundColor:'#ffe2af',
      height: 40,
      width: 120,
      borderColor:'#ffa200',
      alignItems: 'center',
      justifyContent: 'center',
  },
  jurtext: {
      color: '#f7b738',
      fontWeight: 'bold',
      textShadowColor: '#252525',
      textShadowOffset: {weidth: 1, height: 1},
      textShadowRadius: 4,
      fontStyle: 'italic',
      textAlign: 'center',
  },

}
);

