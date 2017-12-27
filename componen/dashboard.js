import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView, 
  ListView,
  AsyncStorage
} from 'react-native';
import { Container, Header,Card, CardItem,  Thumbnail , Content, Icon, Item, } from 'native-base';
import Drawer from 'react-native-drawer';
import Swiper from 'react-native-swiper';
import * as firebase from 'firebase';
var{width,height}=Dimensions.get('window');

export default class Dashboard extends Component<{}> {
   
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

      firebase.database().ref("viewNews").orderByChild("sortTime").on("child_added",(snapshot)=>{
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
  
    logout=()=>{
      const { navigate } = this.props.navigation;
      let keys = ['email', 'password', 'username','userId','uri'];
      AsyncStorage.multiRemove(keys, (err) => {
          alert("Logged out!");
      });
      firebase.auth().signOut();
      navigate('Home');
    }

  render() {
         const { navigate } = this.props.navigation;
    return (
      
     <Drawer
      ref={(ref) => this._drawer = ref}
      type="overlay"
      content={
        <View style={{width : width/1.5, height : height, backgroundColor : '#ff963a'}}>
            
            <View style={{ flexDirection : 'column',}}> 
              <TouchableOpacity style={{backgroundColor:'#ed6a3b',height: 150, width: width/1.5}} onPress={()=>navigate('Profil')}>
                  <Image source={{uri : this.state.imagePath}} style={{marginLeft:8,marginTop:30,alignSelf:'stretch', 
                  height:50, width:50, borderWidth:1,borderRadius:23, borderColor:'white'}}>
                  </Image>
              
              <Text style={{marginLeft:10 ,fontSize: 15,
      fontStyle: 'italic',
      color:'white', fontWeight:'bold'
      }}>
            {this.state.username}
          </Text>
          <Text style={{marginLeft:10,fontSize: 10,
      fontStyle: 'italic',
      color:'white'
      }}>
            {this.state.email}     
          </Text>
          </TouchableOpacity>
            </View>
            
          <View style={{ flexDirection : 'column',}}>

                    <View style={{flexDirection:'row', width:width/1.5,height:100}} style={styles.inputSearch}>
                          
                          <Item>
                          <TextInput underlineColorAndroid='transparent' placeholderTextColor='#a5a5a5' style={styles.Input} 
                          placeholder='Search journalist'/>
                          <TouchableOpacity style={{height:30, width:70, marginLeft:80,}}>
                          <Icon active name='search' style={{marginLeft:20}}/>
                          </TouchableOpacity>
                          </Item>
                      </View>

            <TouchableOpacity style={{height : 50, width : width/1.5,}} onPress={()=>navigate('Senstreet')}>
            <View style={{flex : 1, flexDirection : 'row',}}>  
                  <Icon active name='bicycle' style={{marginLeft:10, marginTop: 10, color:'white'}}/>
              <Text style={styles.pil1text}>
                  SenStreet
              </Text>
            </View>
            </TouchableOpacity>
            

            <TouchableOpacity style={{height : 50, width : width/1.5,}} onPress={()=>navigate('Login')}>
              <View style={{flex : 1, flexDirection : 'row',}}>
                <Icon active name='baseball' style={{marginLeft:10, marginTop: 10, color:'white'}}/>
                <Text style={styles.pil1text}>
                  SenSport
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{height : 50, width : width/1.5, }} onPress={()=>navigate('Login')}>
                <View style={{flex : 1, flexDirection : 'row', }}>
                <Icon active name='medkit' style={{marginLeft:10, marginTop: 10, color:'white'}}/>
                <Text style={styles.pil1text}>
                  SenCana
                </Text>
                </View>
            </TouchableOpacity>          

            <TouchableOpacity style={{height : 50, width : width/1.5, }} onPress={()=>navigate('Login')}>
                <View style={{flex : 1, flexDirection : 'row', }}>
                <Icon active name='pizza' style={{marginLeft:10, marginTop: 10, color:'white'}}/>
                <Text style={styles.pil1text}>
                  SenFood
                </Text>
                </View>
            </TouchableOpacity>
          
            <TouchableOpacity style={{height : 50, width : width/1.5, }} onPress={()=>navigate('Login')}>
                <View style={{flex : 1, flexDirection : 'row', }}>
                  <Icon active name='beer' style={{marginLeft:10, marginTop: 10, color:'white'}}/>
                <Text style={styles.pil1text}>
                  SenEvent
                </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{height : 50, width : width/1.5, }} onPress={()=>navigate('Inputnews')}>
                <View style={{flex : 1, flexDirection : 'row', }}>
                  <Icon active name='paper-plane' style={{marginLeft:10, marginTop: 10, color:'white'}}/>
                <Text style={styles.pil1text}>
                  Be a journalist
                </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{height : 50, width : width/1.5, }} onPress={()=>this.logout()}>
                <View style={{flex : 1, flexDirection : 'row', }}>
                  <Icon active name='paper-plane' style={{marginLeft:10, marginTop: 10, color:'white'}}/>
                <Text style={styles.pil1text}>
                  logout
                </Text>
                </View>
            </TouchableOpacity>
          </View>
      </View>
         }
      tapToClose={true}
      openDrawerOffset={0.2} // 20% gap on the right side of drawer
      panCloseMask={0.2}
      closedDrawerOffset= {-3}
      styles={drawerStyles}
      tweenHandler={(ratio) => ({
        main: { opacity:(2-ratio)/2 }
      })}
      >
      
    <View style={{width : width, height : height, backgroundColor : '#ffefcc'}}>
         <View style={{ flexDirection:'row', backgroundColor:'#ffefcc', height:50, width:width}}>
            <TouchableOpacity style={{height : 85, width : 80, marginLeft : 10, marginTop : 5,}} activeOpacity={0.3} onPress={()=>this.openControlPanel()}>
                <Image style={styles.button} source={require('./../img/menu.png')} style={styles.drawerImage}/>
            </TouchableOpacity>
            <Image source={require('./../img/text.png')} style={styles.kopImage}/>
          </View>
  <ScrollView contentContainerStyle={styles.contentContainer}>  
    <View style={{height:200, width:width}}>
      <Swiper style={styles.wrapper} autoplay={true} showsButtons={true}>
        <View style={{width:100, height:20}} style={styles.slide1}>
          <Image source={require('./../img/senorti2.png')} style={styles.swiper}/>
        </View>
        <View style={styles.slide2}>
        <View style={{width:100, height:20}} style={styles.slide1}>
          <Image source={require('./../img/senstreet.png')} style={styles.swiper}/>
        </View>
        </View>
        <View style={styles.slide3}>
        <View style={{width:100, height:20}} style={styles.slide1}>
          <Image source={require('./../img/senall.png')} style={styles.swiper}/>
        </View>
        </View>
      </Swiper>
    </View>
      
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => 

                        <TouchableOpacity style={{marginLeft:10, marginTop:5, marginRight:8,}} onPress={()=>navigate('Viewnews',{uri : rowData.uri,profile :rowData.photoProfile, description : rowData.description, title : rowData.title, date : rowData.date, username : rowData.username})}>
                        <CardItem style={{borderColor:'#dbdbdb', borderWidth:1,}}>                       
                        <View style={styles.profilList}>
                            <Thumbnail source={{uri : rowData.photoProfile}}style={styles.jurImage} />
                        </View>
                        <View style={{flexDirection:'column', marginLeft: 10, marginTop:5 }}>
                            <Text style={styles.textList}>{rowData.username}</Text>
                            <Text style={{fontSize:10}}>{rowData.date}</Text>
                        </View>
                        </CardItem>

                        <CardItem cardBody style={{borderColor:'#dbdbdb', borderWidth:1}}>
                        <View style={{alignSelf:'center', marginLeft:35, marginBottom: 5, marginTop: 10}}> 
                            <Image style={{ height:100, width :280 }} source={{uri : rowData.uri}} /> 
                            <Text style={{fontWeight:'bold'}}>
                                {rowData.title}
                            </Text>
                        </View>
                        </CardItem>
                        </TouchableOpacity>      
        }/>
                    
 


            </ScrollView>
        </View>
            
    </Drawer>

    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20, textAlign: 'center', margin: 10,
  },
  instructions: {
    textAlign: 'center', color: '#333333', marginBottom: 5,
  },
    searchButton: {
      position: 'absolute', alignSelf: 'stretch', width:2, justifyContent: 'center', height:3,
  },
  Button:
  {
    position: 'absolute', top: 40, bottom: 10, alignSelf: 'center',
  },
  
  drawerImage:
  {
      alignSelf: 'stretch', width:40, height:40,
  },

  profilImage:
  {
    height:160, width:260,
  },
  pil1text:
  {
      fontSize : 13, marginTop: 14,
      marginLeft: 15, color: 'white', fontWeight: 'bold', fontStyle: 'italic',
  },
  pilImage:
  {
    marginTop: 10, marginLeft: 10, width: 30, height: 30,
  },
  profilIcon:
  {
  alignSelf:'center',
  },
  profil:
  {
    marginTop:30, width:75, height:75,
  },
   wrapper: {
  },
  koptext:
  {
      fontSize : 30, marginTop: 10, marginLeft: 20, color: '#ffff6b',
      textShadowColor: '#252525', textShadowOffset: {weidth: 2, height: 2},
      textShadowRadius: 10, fontWeight: 'bold', fontStyle: 'italic',
  },
  kopImage:
  {
    width:165, height:35, alignSelf:'center', marginTop:5, marginLeft:10,
  },
  swiper:
  {
    width:width, height:200
  },
      inputSearch: 
    {
      height:40, backgroundColor:'white', borderWidth: 1, borderColor:'white',
    },
    Input:
    {
      width:110, fontSize: 13, fontStyle: 'italic', color:'black',
    },
    listImage:
    {
      height:55, width: 80, marginLeft: 5, marginTop:8, 
    },
    listText:
    {
      fontStyle: 'italic', color:'black', fontWeight:'bold', marginLeft: 5, marginTop:5,
    },
    profilList:
    {
      width: 35, height: 35, 
    },
    jurImage:
    {
            width: 35, height: 35,
    },
      contentContainer: {
    paddingVertical:35,
  }


});
