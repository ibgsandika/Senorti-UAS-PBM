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
import * as firebase from 'firebase';
var{width,height}=Dimensions.get('window');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : null,
      password:null,
      uid:null,
    };
  }
  login(){
     firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(() => {
      alert('login succuess');
     const { navigate } = this.props.navigation;
      navigate('Dashboard');
    }).catch((error) => {
      alert("error " + error.message );
    });
  }

     static navigationOptions = {
      header : null
  };

  render() {
  
     const { navigate } = this.props.navigation;
  
    return (

        <View style={styles.container}>
            <Image source={require('./../img/lol.jpg')} style={styles.backgroundImage}>

              <View style={styles.logologin}>
                <Image source={require('./../img/logo34.png')} style={styles.logoImage2}>
                </Image>
              </View>
                  <Text style={styles.logo}>LOGIN USER
                  </Text>
                 
                      <View style={styles.InputContainerName}>
                          <TextInput underlineColorAndroid='transparent' placeholderTextColor='white' style={styles.Input} 
                          placeholder='Username'
                          onChangeText={(email) => this.setState({email})}
                          value={this.state.email}/>
                      </View>
    
                      <View style={styles.InputContainerPass}>          
                            <TextInput secureTextEntry={true} underlineColorAndroid='transparent' placeholderTextColor='white' style={styles.Input} placeholder='Password'               
                          onChangeText={(password) => this.setState({password})}
                          value={this.state.password}/>
                          
                      </View>

        <View style={styles.button}>
        <TouchableOpacity style={{height : 35, width : 270}} onPress={()=>this.login()}>
          <View style={styles.Loginbutton}>
              <Text style={styles.Loginbutton1}>
                LogIn

              </Text>
          </View>
        </TouchableOpacity>
          
            <Text style={styles.textsign}>
              Create your account?
            </Text>   
        
        <TouchableOpacity style={{height : 35, width : 270}} onPress={()=>navigate('Signin')}>
          <View style={styles.signup}>
              <Text style={styles.signup1}>
                SignUp

              </Text>
          </View>
        </TouchableOpacity>
         </View>
            </Image>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    backgroundImage: {
      alignSelf: 'stretch',
      width:width,
      justifyContent: 'center',
      height:height,
    },
    logo: {
      color: '#ffff6b',
      top: 150,
      fontStyle: 'italic',
      fontWeight: 'bold',
      textShadowColor: '#252525',
      textShadowOffset: {weidth: 2, height: 2},
      textShadowRadius: 15,
      marginBottom: 20,
      fontSize: 25,
      textAlign:'center',   
    },
    
    logologin: {
      position: 'absolute',
      top: 40,
      bottom: 70,
    alignSelf: 'center',
    },
    
    logoImage2: {
      width:150,
      justifyContent: 'center',
      height:150,
    },
    InputContainerName: {
      top: 90,
      margin:40,
      marginBottom: 2,
      alignSelf: 'stretch',
      borderWidth: 2,
      borderColor:'#fff',
    },
    Input:
    {
      fontSize: 15,
      fontStyle: 'italic',
      color:'white',
      textShadowOffset: {weidth: 2, height: 2},
    },
      
    InputContainerPass: {
      top: 60,
      margin:40,
      marginBottom: 0,
      alignSelf: 'stretch',
      borderWidth: 2,
      borderColor:'#fff',
    },

    signup: {
      marginTop: 0,
      borderWidth: 2,
      width: 270,
      height: 35,
      backgroundColor:'#f2f2ed',
      borderColor:'#fff',
      alignSelf:'center',
      borderRadius: 5
    },
    signup1: {
      color: '#f7b738',
      fontWeight: 'bold',
      textShadowColor: '#252525',
      textShadowOffset: {weidth: 1, height: 1},
      textShadowRadius: 4,
      fontStyle: 'italic',
      textAlign: 'center',
    },

    Loginbutton: {
      marginTop: 0,
      borderWidth: 2,
      width: 270,
      height: 35,
      backgroundColor:'#efefef',
      borderColor:'#efefef',
      alignSelf:'center',
      borderRadius: 5
    },
    Loginbutton1: {
      color: '#f7b738',
      fontWeight: 'bold',
      textShadowColor: '#252525',
      textShadowOffset: {weidth: 1, height: 1},
      textShadowRadius: 4,
      fontStyle: 'italic',
      textAlign: 'center',
    },
    textsign: {

      marginTop:5,
      color: 'white',
    textAlign: 'center',
    },
    button: {
      width:width,
      alignItems : 'center',
      marginTop: 80
    }
});
