/** lOGIN */

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
import { StackNavigator } from 'react-navigation';
var{width,height}=Dimensions.get('window');
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';
export default class Signin extends Component {

   static navigationOptions = {
      header : null
  };

  constructor(props) {
    super(props);
    this.state = {
      date:"1990-05-15",
      email : null,
      password:null,
      uid:null,
      phoneNumber:null,
      username:null,
      
   
    };
console.ignoredYellowBox = [
'Setting a timer'
] 
 
  }
  signup(){
  firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(() => {
      var userId = firebase.auth().currentUser.uid;
      this.writeakun(userId);
      alert('create success');
      const { navigate } = this.props.navigation;
      navigate('Dashboard');
    }).catch((error) => {
      alert("error " + error.message );
    });
  }

  writeakun=()=>{
    let today = new Date();
    let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let sortTime = -1*today.getTime();
    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database().ref("admin").child(userId);

    database.set({
      sortTime : sortTime,
      createdAt : Times,
      userId : userId,
      email : this.state.email,
      username :this.state.username,
      birthday : this.state.date,
      phoneNumber : this.state.phoneNumber,
    }).then((snapshot)=>{

       firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
         AsyncStorage.multiSet([
              ["userId", userId],
              ["email", this.state.email],
              ["password", this.state.password],
              ["username", this.state.username],
              ["birthday", this.state.birthday],
              ["phoneNumber", this.state.phoneNumber]
            ]);

        /** Set AsyncStorage START **/
        const { navigate } = this.props.navigation;
        navigate('Homelogin');
        
        }).catch((error) => {
            alert("error " + error.message );
           
        });
    });
  }

  render() {
     const { navigate } = this.props.navigation;
    return (
          <ScrollView>
          <Image source={require('./../img/FLASH.png')} style={styles.backgroundImage}>
              <View style={styles.logosign}>
                        <Image source={require('./../img/logo34.png')} style={styles.logoImage}>
                        </Image>
              </View>
                  <Text style={styles.logo}>Registration Your Account
                  </Text>
                <View style={styles.InputNameUser}>
                      <TextInput underlineColorAndroid='transparent' placeholderTextColor='white' style={styles.Input} 
                          placeholder='Choose Username'
                          onChangeText={(username) => this.setState({username})}
                          value={this.state.username}/>
                </View>
                  
                <View style={styles.InputPassUser}>
                      <TextInput SecureTextEntry={true} underlineColorAndroid='transparent' placeholderTextColor='white' style={styles.Input} 
                          placeholder='Choose Password'
                          onChangeText={(password) => this.setState({password})}
                          value={this.state.password}/>
                </View>


               <View style={styles.InputEmailUser}>
                      <TextInput underlineColorAndroid='transparent' placeholderTextColor='white' style={styles.Input} 
                          placeholder='Your Email'
                          onChangeText={(email) => this.setState({email})}
                          value={this.state.email}/>
                </View>

               <View style={styles.InputPhoneUser}>
                      <TextInput underlineColorAndroid='transparent' placeholderTextColor='white' style={styles.Input} 
                          placeholder='Phone Number'
                          onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                          value={this.state.phoneNumber}/>
                </View>
              
              <View style={styles.InputDateBirth}>
                <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1998-05-01"
                maxDate="20-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0

                  },
                  dateInput: {
                    marginLeft: 36,
                  }
  
                }}
                onDateChange={(date) => {this.setState({date})}}
                value={this.state.date}
              />
              </View>
                  <TouchableOpacity style={{height : 70, width : 270, alignSelf : 'center'}} onPress={()=>this.signup()}>
          <View style={styles.signin}>
              <Text style={styles.signin1}>
                Create the Account
              </Text>
          </View>
        </TouchableOpacity>

          </Image>
   </ScrollView>
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
      color: '#ffff6b',
      fontStyle: 50,
      top: 25,
      fontStyle: 'italic',
      fontWeight: 'bold',
      textShadowColor: '#252525',
      textShadowOffset: {weidth: 2, height: 2},
      textShadowRadius: 15,
      marginBottom: 20,
      fontSize: 25,
      textAlign:'center',   
    },
  logosign: {
      position: 'absolute',
      top: 40,
      bottom: 10,
    alignSelf: 'center',
  },
  logoImage: {
      alignSelf: 'stretch',
      width:100,
      justifyContent: 'center',
      height:100,
  },
      InputNameUser: {
      top: 5,
      marginTop: 10,
      margin:40,
      marginBottom: 1,
      alignSelf: 'stretch',
      borderWidth: 1,
      height: 40,
      width: 220,
      borderColor:'#fff',
      alignSelf: 'center'
    },
    Input: {
      fontSize: 12,
      fontStyle: 'italic',
      color:'white',
      textShadowOffset: {weidth: 1, height: 1},
      textAlign:'center'
    },
      InputPassUser: {
      top: 5,
      marginTop: 5,
      margin:40,
      marginBottom: 1,
      alignSelf: 'stretch',
      borderWidth: 1,
      height: 40,
      width: 220,
      borderColor:'#fff',
      alignSelf: 'center'
    },
      InputEmailUser: {
      top: 5,
      marginTop: 5,
      margin:40,
      marginBottom: 1,
      alignSelf: 'stretch',
      borderWidth: 1,
      height: 40,
      width: 220,
      borderColor:'#fff',
      alignSelf: 'center'
    },
      InputPhoneUser: {
      top: 5,
      marginTop: 5,
      margin:40,
      marginBottom: 2,
      alignSelf: 'stretch',
      borderWidth: 1,
      height: 40,
      width: 220,
      borderColor:'#fff',
      alignSelf: 'center'
    },
      InputDateBirth: {
      top: 5,
      marginTop: 5,
      margin:40,
      marginBottom: 2,
      alignSelf: 'stretch',
      height: 40,
      width: 220,
      borderColor:'#fff',
      alignSelf: 'center'
    },
    signin: {
      marginTop: 10,
      borderWidth: 2,
      width: 220,
      height: 40,
      backgroundColor:'#f2f2ed',
      borderColor:'#fff',
      borderRadius: 6,
      alignSelf: 'center'
    },
    signin1: {
      top:2,
      color: '#f7b738',
      fontWeight: 'bold',
      textShadowColor: '#252525',
      textShadowOffset: {weidth: 1, height: 1},
      textShadowRadius: 4,
      fontStyle: 'italic',
      textAlign: 'center',
    },


});
