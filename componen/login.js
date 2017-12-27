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
  Modal,
  ActivityIndicator,
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
      loading : true,
      modalLoading : false
    };

    AsyncStorage.multiGet(["email", "password"]).then((data)=>{
      var email = data[0][1];
      if(email != null){
        this.setState({
          modalLoading : true
        });
        firebase.auth().signInWithEmailAndPassword(data[0][1],data[1][1]).then(()=>{
          var userId = firebase.auth().currentUser.uid;
          var database = firebase.database().ref("admin/"+userId+"");
          database.on("value", (snapshot)=>{
            AsyncStorage.multiSet([
              ["username", snapshot.val().username],
              ["uri", snapshot.val().uri]
            ]);
          });
          this.setState({
            modalLoading : false
          });
          const { navigate } = this.props.navigation;
          navigate('Dashboard');
        }).catch(error=>{
          alert(error);
        });
      }
    });

  }

  login=()=>{
   
     firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(() => {
      this.setState({
        modalLoading : true
      });
      var userId = firebase.auth().currentUser.uid;
      var database = firebase.database().ref("admin/"+userId+"");
      database.on("value",(snapshot)=>{
        AsyncStorage.multiSet([
          ["email", this.state.email],
          ["password", this.state.password],
          ["userId", userId],
          ["username", snapshot.val().username],
          ["uri", snapshot.val().uri]
        ]);
      });
      this.setState({
        modalLoading : false
      });
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
      <ScrollView>
         <Modal
              animationType = {"fade"}
              transparent   = {true}
              visible       = {this.state.modalLoading} onRequestClose ={()=>{console.log('closed')}}
          >
            <View style={{height : height, width : null,  backgroundColor: 'rgba(0, 0, 0, 0.56)'}}>

              <View style={{
                  backgroundColor : 'white',
                  borderRadius: 5,
                  marginLeft: '25%',
                  height: 100,
                  width: '50%',
                  alignItems: 'center',
                  marginTop: '70%'
              }} >
                  <ActivityIndicator
                      animating={this.state.loading}
                      color="#bc2b78"
                      size = 'large'
                      style={{marginTop:30}}
                  />
              </View>
            </View>
          </Modal>
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
        </ScrollView>
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
