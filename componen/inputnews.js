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
  Picker,
  Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';
var{width,height}=Dimensions.get('window');
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
var ImagePicker = require('react-native-image-picker');
const polyfill = RNFetchBlob.polyfill;

window.XMLHttpRequest = polyfill.XMLHttpRequest;
window.Blob = polyfill.Blob;

export default class Inputnews extends Component {

   static navigationOptions = {
      header : null
  };
    constructor(props) {
    super(props);
    this.state = {
      tittle : '',
      language : '',
      date:"2017-12-01",
      description:'',
      imageUploadPath : null, //path gambar untuk diupload ke storage
      jenis : 'Senstreet',
      username : '',
      profile : ''
    };

    AsyncStorage.multiGet(["username","uri"]).then((data)=>{
      this.setState({
          username : data[0][1],
          profile : data[1][1]
      });
    });

    console.ignoredYellowBox = [
'Setting a timer'
] 
  }

  post=()=>{ 
    let today = new Date();
    let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let sortTime = -1*today.getTime();// mengambil waktu sekarang utuk sorting
    var userId = firebase.auth().currentUser.uid;
    Blob.build(RNFetchBlob.wrap(""+this.state.imageUploadPath+""), { type : 'image/jpeg' }).then((blob)=>{
      firebase.storage().ref("news/"+userId+"").child(""+sortTime+"").put(blob, { contentType : 'image/png', }).then(()=>{
        var storage = firebase.storage().ref("news/"+userId+"/"+sortTime+"");   
        storage.getDownloadURL().then((url)=>{
          var database = firebase.database().ref("news/"+userId+"");
          database.push({
            uri : url,
            createdAt : Times,
            date : this.state.date,
            description : this.state.description,
            jenisBerita : this.state.jenis,
            sortTime : sortTime,
            title : this.state.tittle,
            userId : userId,
            username : this.state.username,
            phototProfile : this.state.profile
          }).then((snapshot)=>{
              database = firebase.database().ref("viewNews/"+snapshot.key+"");
              database.set({
                uri : url,
                createdAt : Times,
                date : this.state.date,
                description : this.state.description,
                jenisBerita : this.state.jenis,
                sortTime : sortTime,
                title : this.state.tittle,
                userId : userId,
                username : this.state.username,
                phototProfile : this.state.profile
                          })
              }).then(()=>{
                const { navigate } = this.props.navigation;
                navigate("Dashboard");
              });
        }); 
        
      });
  });

  }

  GetImagePath=()=>{
    ImagePicker.showImagePicker((response) => {
        if (response.didCancel) {
        }
        else if (response.error) {
         // alert("An Error Occurred During Open Library"); // jika terjadi kesalahan saat menggunakan image picker
          Alert.alert(
            'senorti',
            'An Error Occurred During Open Library!',
            [
              {text: 'OK'}],
            { cancelable: false }
          );
        }
        else if (response.customButton) {
        }
        else {
          let source = { uri: response.uri };
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            imageUploadPath : source.uri //simpan alamat gambar untuk di upload ke firebase storage --url--
          });
        }
      });
   }

  render() {
     const { navigate } = this.props.navigation;
    return (
          <ScrollView>
      <View style={{backgroundColor:'#ffe2af', width:width}}>
        <Image source={require('./../img/logo34.png')} style={styles.logoImage}/>
        <Text style={{marginTop:5,alignSelf:'center',fontStyle:'italic',color:'black', fontWeight:'bold',
        fontSize:15}}>Share Your News To Help Each Other</Text>          
          
          <Image source={{uri : this.state.imageUploadPath}} style={{alignSelf:'center', height:200, width:200}}>
          </Image>

          <TouchableOpacity onPress={()=>this.GetImagePath()} style={{alignSelf:'center',height : 30, width : width-150, backgroundColor : 'orange'}}>
          <View><Text style={{textAlign:'center', fontStyle:'italic', fontSize:12, color:'white', marginTop:5}}>Choose Image</Text></View>
          </TouchableOpacity>
         
          <View style={styles.InputContainerTit}>
            <TextInput underlineColorAndroid='transparent' placeholderTextColor='white' style={styles.Input} 
            placeholder='Tittle' onChangeText={(tittle) => this.setState({tittle})}/>
          </View>

          <View style={{marginTop:10, width: 120, alignSelf:'center', borderWidth:1, borderColor:'#ea8148', height:40}}>
          <Picker   
              selectedValue={this.state.jenis}
              onValueChange={(itemValue, itemIndex) => this.setState({jenis: itemValue})}>
              <Picker.Item label="Senstreet" value="Senstreet" />
              <Picker.Item label="Sensport" value="Sensport" />
              <Picker.Item label="SenCana" value="SenCana" />
              <Picker.Item label="SenFood" value="SenFood" />
              <Picker.Item label="SenEvent" value="SenEvent" />
          </Picker>
          </View>

          <View style={styles.InputDateBirth}>
                <DatePicker
                style={{width: 230}}
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

          <View style={styles.InputContainerDes}>          
            <TextInput editable = {true}   multiline = {true}
         numberOfLines = {200}  underlineColorAndroid='transparent' placeholderTextColor='white' style={styles.Input} 
            placeholder='Description' onChangeText={(description) => this.setState({description})}>               
            </TextInput>
          </View>

          <TouchableOpacity style={{height : 70, width :width, alignSelf : 'center'}}
            onPress={()=>this.post()}
          >
          <View style={styles.share}>
              <Text style={styles.share1}>
              - SHARE YOUR NEWS -
              </Text>
          </View>
        </TouchableOpacity>

      
      </View>
         </ScrollView>
            );
  }
}

const styles = StyleSheet.create({
      logoImage: {
    width:50, height:50, alignSelf:'center', marginTop:10,
  },
  Input:{
    fontSize: 15,
      fontStyle: 'italic',
      color:'white',    
    },
    InputContainerDes:
    {
      marginTop: 5,
      borderWidth: 2,
      width: 270,
      height: 200,
      backgroundColor:'#ea8148',
      borderColor:'#ea8148',
      alignSelf:'center',
      borderRadius: 5
    },
    InputContainerTit:
    {
      marginTop: 10,
      borderWidth: 2,
      width: 270, 
      height: 50,
      backgroundColor:'#ea8148',
      borderColor:'#ea8148',
      alignSelf:'center',
      borderRadius: 5
    },
    InputDateBirth:{
      marginTop:5,
      alignSelf:'center'
    },      
    share: {
            marginTop: 10,
      borderWidth: 2,
      width: 220,
      height: 40,
      backgroundColor:'#ea8148',
      borderColor:'#ea8148',
      borderRadius: 6,
      alignSelf: 'center'
    },
    share1:
    {
      top:2,
      color: 'white',
      fontWeight: 'bold',
      textShadowColor: '#252525',
      textShadowOffset: {weidth: 1, height: 1},
      textShadowRadius: 4,
      fontStyle: 'italic',
      textAlign: 'center',
    }



});
 