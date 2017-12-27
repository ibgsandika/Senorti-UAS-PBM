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
  Alert,
  ListView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Container, Header,Card, CardItem,  Thumbnail , Content, Icon, Item, } from 'native-base';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
var{width,height}=Dimensions.get('window');
var ImagePicker = require('react-native-image-picker');
const polyfill = RNFetchBlob.polyfill;

window.XMLHttpRequest = polyfill.XMLHttpRequest;
window.Blob = polyfill.Blob;

export default class Profil extends Component {

     static navigationOptions = {
      header : null
  };
      constructor(props)
    {
      super(props);
      var user = firebase.auth().currentUser;
      var userId = user.uid;
      this.state = {
        userId : userId,
        username : '',
        email : '',
        phoneNumber : '',
        imagePath :"uri of image", //path gambar untuk ditampilkan pada aplikasi
        imageUploadPath : null, //path gambar untuk diupload ke storage
        uri : '',
        date:'',
        description:'',
        pilih:false,
        edit:false,
        profilUri: '',
        dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      }
        this.data=[];
    }

    componentWillMount()
    {
      AsyncStorage.multiGet(['userId','username','email', 'phoneNumber', 'birthday']).then((data) => {
      this.setState({
        userId : data[0][1],
        username : data[1][1],
        email : data[2][1],
        phoneNumber : data[3][1],
        birthday: data[4][1]
      });
    
    firebase.database().ref("admin/"+data[0][1]).on('value',(snap)=> {
      this.setState({
        username:snap.val().username, 
        email:snap.val().email,
        phoneNumber:snap.val().phoneNumber, 
        imageUploadPath : snap.val().uri
      })
      if(snap.val().uri === null || snap.val().uri == null || snap.val().uri === undefined || snap.val().uri == undefined  ){
         this.setState({
           imageUploadPath : 'https://firebasestorage.googleapis.com/v0/b/senorti-d95fc.appspot.com/o/users%2Fuser.png?alt=media&token=12693398-87ac-4dc6-bf3a-2ae32ff7781d'
         });
      }
    });

firebase.database().ref("news/"+data[0][1]+'').orderByChild("sortTime").on("child_added",(snapshot)=>{
        this.data.push({
          id : snapshot.key,
          username : snapshot.val().username,
          date : snapshot.val().date,
          uri : snapshot.val().uri,
          title : snapshot.val().title,
          photoProfile : snapshot.val().phototProfile,
          description : snapshot.val().description
        });
        this.setState({
          dataSource : this.state.dataSource.cloneWithRows(this.data),
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
              'Senorti',
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
            alert(JSON.stringify(source));
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              imagePath : source, //simpan alamat gambar untuk ditampilkan pada aplikasi --obj--
              imageUploadPath : source.uri //simpan alamat gambar untuk di upload ke firebase storage --url--
            });
          }
        });
     }

eprof = () => {
var database = firebase.database().ref("admin/"+this.state.userId);
      database.update({
        username:this.state.username, 
        email:this.state.email,
        phoneNumber:this.state.phoneNumber, 
      })
    alert('update success')    
 
  }


  upload=()=>{
    let today = new Date();
    let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let sortTime = -1*today.getTime();// mengambil waktu sekarang utuk sorting
    var userId = firebase.auth().currentUser.uid;
    Blob.build(RNFetchBlob.wrap(""+this.state.imageUploadPath+""), { type : 'image/jpeg' }).then((blob)=>{
      firebase.storage().ref("users/"+userId+"").child(""+sortTime+"").put(blob, { contentType : 'image/png', }).then(()=>{
        var storage = firebase.storage().ref("users/"+userId+"/"+sortTime+"");   
        storage.getDownloadURL().then((url)=>{
          var database = firebase.database().ref("admin/"+userId+"");
          database.update({
            uri : url
          });
          alert('save image success')
        }); 
        
      });
    });
  }




  delitem = () => {
    //delete di tampilan profil
    var database = firebase.database().ref("news/"+this.state.userId+'');
    database.remove();
    alert('deleted');
    //delete di tampilan dashboard
    var database1 = firebase.database().ref("viewNews/");//masih belum di view news
    database1.remove();
    alert(JSON.stringify(database))
    this.setState({pilih : false});
    //const { navigate } = this.props.navigation;
    //  navigate('Dashboard');
  }


  render() {      

     const { navigate } = this.props.navigation;
  
    return (


<View style={{flexDirection:'column',backgroundColor:'#ffefcc', width:width, height:height}}>
  
<Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.pilih} 
              onRequestClose ={()=>this.setState({pilih : false})}>
              <TouchableWithoutFeedback>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                      <View style={{backgroundColor : 'white', height : height/5, width : width-100, borderRadius : 5
                    , alignSelf : 'center', marginTop : height/2.5}}>
                      
                      <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5
                      , borderTopRightRadius : 5 }}>
                      
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Pilih Satu</Text>
                      </View>

                      <TouchableOpacity onPress={() =>this.delitem()}>
                        <View style={{height:40, width:width-100, marginTop:10, alignItems:'center'}}>
                          <Text style={{color:'black'}}>Hapus News</Text>
                        </View>
                      </TouchableOpacity>
              
                      <TouchableOpacity onPress={()=>this.setState({edit : true})}>
                        <View style={{height:40, width:width-100, alignItems:'center'}}>
                          <Text style={{color:'black'}}>Edit News</Text>
                        </View>
                      </TouchableOpacity>
                      
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>



<Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.edit} 
              onRequestClose ={()=>this.setState({pilih : false})}>
              <TouchableWithoutFeedback>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                      <View style={{backgroundColor : 'white', height : height-50, width : width-30, borderRadius : 5
                    , alignSelf : 'center', marginTop : 10}}>
                      
                      <View style={{height : 35, width : width-30, backgroundColor : '#2980b9', borderTopLeftRadius : 5
                      , borderTopRightRadius : 5 }}>
                      
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>-EDIT-</Text>
                      </View>

                      
                      <View style={{height:40, width:width-100, marginTop:10, alignItems:'center'}}>
                      <TextInput
                      underlineColorAndroid="transparent"
                      style={{marginLeft:70,fontSize: 15,
                        fontStyle: 'italic',
                        color:'black', borderWidth:1, backgroundColor: '#f49b42', width:width-50, height:40, 
                        borderColor:'#f49b42'}}
                    />                
                        </View>

                        <View style={{height:40, width:width-100, marginTop:10, alignItems:'center'}}>
                      <TextInput
                      underlineColorAndroid="transparent"
                      style={{marginLeft:70,fontSize: 15,
                        fontStyle: 'italic',
                        color:'black', borderWidth:1, backgroundColor: '#f49b42', width:width-50, height:200, 
                        borderColor:'#f49b42'}}
                    />                
                        </View>
                      
              
                      <TouchableOpacity onPress={()=>this.setState({edit : true})}>
                        <View style={{marginTop:180,marginLeft:20,height:40, width:width-100, alignItems:'center'}}>
                          <Text style={{color:'black'}}>Edit News</Text>
                        </View>
                      </TouchableOpacity>
                      
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>






          <View style={{ flexDirection:'row', backgroundColor:'#ffefcc', height:50, width:width}}>
                    <Text style={{ color: '#ffff6b', marginTop:5,
                fontStyle: 'italic',
                fontWeight: 'bold',
                textShadowColor: '#252525',
                textShadowOffset: {weidth: 1, height: 1},
                textShadowRadius: 8,
                marginBottom: 20,
                height:40, width:140,
                fontSize: 25, marginLeft:120}}>
                    Your Profil
                    </Text>
                        <Item>
                <TouchableOpacity style={{height:30, width:70, marginLeft:20, marginTop:5}}>
                  <Icon active name='settings' style={{marginLeft:40, color:'#f48f42'}}/>
                </TouchableOpacity>
              </Item>
          </View>
<ScrollView contentContainerStyle={{paddingVertical:35}}>
          <View style={{flexDirection:'column', backgroundColor:'#f49b42', width:width, height:305}}>
          <TouchableOpacity onPress={()=>this.GetImagePath()} style={{marginTop:25, marginBottom:5 ,height:90, width:90, alignSelf:'center'}}>
              <Thumbnail source={{uri : this.state.imageUploadPath}} style={{alignSelf:'center', height:90, width:90}}/>
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf:'center',width:150}} onPress={()=>this.upload()}>
          <View style={{alignSelf:'center', height: 35, flexDirection:'row',borderWidth:1,
                borderColor:'#fff0c4',backgroundColor:'#fff0c4',borderRadius:10, width:120}}>
                <Icon active name='camera' style={{marginLeft:5 ,color:'#f4c842', marginBottom:5}}/>
                <Text style={{fontSize: 15,
            fontStyle: 'italic',
            color:'#efbe2d',marginTop:5,marginLeft:5, marginBottom:5}}>Save Image</Text>
           </View>
                </TouchableOpacity>
                    
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={{fontSize: 15,
                        fontStyle: 'italic',
                        color:'black',
                        textAlign:'center', borderWidth:1, backgroundColor: '#f49b42', width:width, height:40, borderColor:'#f49b42'}}
                      onChangeText={(text) => this.setState({username : text})}
                      value={this.state.username}
                    />

                <TextInput
                      underlineColorAndroid="transparent"
                      style={{fontSize: 15,
            fontStyle: 'italic',
            color:'black',
            textAlign:'center', borderWidth:1, backgroundColor: '#f49b42', width:width, height:40, borderColor:'#f49b42'}}
                      onChangeText={(text) => this.setState({email : text})}
                      value={this.state.email}
                    />
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={{fontSize: 15,
            fontStyle: 'italic',
            color:'black',
            textAlign:'center', borderWidth:1, backgroundColor: '#f49b42', width:width, height:40, borderColor:'#f49b42'}}
                      onChangeText={(text) => this.setState({phoneNumber : text})}
                      value={this.state.phoneNumber}
                    />
                <TouchableOpacity style={{width:width}} onPress={()=>this.eprof()}>
                <View style={{alignSelf:'center', height: 35, flexDirection:'row',borderWidth:1,
                borderColor:'#f49b42',backgroundColor:'#f49b42', width:width}}>
                <Icon active name='refresh' style={{alignSelf:'center' ,color:'blue',marginTop:2, marginBottom:5}}/>
                <Text style={{fontSize: 15, textAlign:'center',
            fontStyle: 'italic',
            color:'black',marginTop:5,marginLeft:5, marginBottom:5}}>Save Changed</Text>
          </View>
          </TouchableOpacity>

        </View>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => 

                      <View>
                        <CardItem style={{borderColor:'#dbdbdb', borderWidth:1,}}>                      
                        <View style={{flexDirection:'row', marginLeft: 10, marginTop:5 }}>
                            <Text style={{fontSize:15}}>{rowData.date}</Text>
                            <TouchableOpacity onPress={()=> this.setState({ pilih : true })}>
                            <Image source={require('./../img/interface.png')} style={{marginLeft: 220,height:20, width:8}}/>
                            </TouchableOpacity>
                        </View>
                        </CardItem>

                        <CardItem cardBody style={{borderColor:'#dbdbdb', borderWidth:1}}>
                        <View style={{alignSelf:'center', marginLeft:35, marginBottom: 5, marginTop: 10}}> 
                            <Image style={{ height:100, width :280 }} source={{uri : rowData.uri}} /> 
                            <Text style={{fontWeight:'bold'}}>
                                {rowData.title}
                            </Text>
                            <Text style={{fontSize:12}}>
                                {rowData.description}
                            </Text>
                        </View>
                        </CardItem>
                        </View>
        }/>
</ScrollView>             
    </View>

    );
  } 
}
const styles = StyleSheet.create({

});
