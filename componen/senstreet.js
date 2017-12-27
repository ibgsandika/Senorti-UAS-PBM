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
  ListView
} from 'react-native';
import { Container, Header,Card, CardItem,  Thumbnail , Content, Icon, Item, } from 'native-base';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
var{width,height}=Dimensions.get('window');

export default class Profil extends Component {

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
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    this.state = {
        userId : userId,
        username : '',
        email : '',
        imagePath : '',
        dataSource: new ListView.DataSource({rowHasChanged : (row1, row2)=> row1 !== row2}), 
    };
  this.data = [];
console.ignoredYellowBox = [
'Setting a timer'
] 
  }

    componentWillMount()
    {
      firebase.database().ref("admin/"+this.state.userId).on('value',(snap)=> {
        this.setState({
          username:snap.val().username, 
          email:snap.val().email,
          imagePath : snap.val().uri
        });
        if(snap.val().uri === null || snap.val().uri == null || snap.val().uri === undefined || snap.val().uri == undefined  ){
          this.setState({
            imageUploadPath : 'https://firebasestorage.googleapis.com/v0/b/senorti-d95fc.appspot.com/o/users%2Fuser.png?alt=media&token=12693398-87ac-4dc6-bf3a-2ae32ff7781d'
          });
       }
      });

      firebase.database().ref("viewNews/"+'-L1Ig6cGmw_i1j-SMnB7').orderByChild("sortTime").on("child_added",(snapshot)=>{
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
    }


  render() {

  
     const { navigate } = this.props.navigation;
  



     return (
      <View style={{flexDirection:'column', backgroundColor:'#ffefcc' ,height:height, width:width}}>
        <View style={{ flexDirection:'row', backgroundColor:'#ffe2af', height:50, width:width,}}>
          <Text style={{ color: '#ffff6b', marginTop:5,
            fontStyle: 'italic',
            fontWeight: 'bold',
            textShadowColor: '#252525',
            textShadowOffset: {weidth: 1, height: 1},
            textShadowRadius: 8,
            marginBottom: 20,
            height:40, width:140,
            fontSize: 25, marginLeft:120}}>
               - SenEvent - 
            </Text>
        </View>


                  
      </View>

);
  }
}

const styles = StyleSheet.create({

});
