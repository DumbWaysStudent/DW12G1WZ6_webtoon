import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,Image,Dimensions } from 'react-native';
import { Header, Left, Body, Right, Icon, CardItem,Card } from 'native-base'

const fitScreen = Dimensions.get('window').width;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  goToEditProfile =()=> this.props.navigation.navigate('EditProfile')
  goToMangaCreation =()=>this.props.navigation.navigate('MangaCreation')
  goToPrevScreen =()=>this.props.navigation.goBack();
  logOut =()=>this.props.navigation.navigate('Login')
  render() {
    return (
      <View>
          <Header style ={{backgroundColor:'light-gray'}}>
                <Body>
                    <Text>Profile</Text>
                </Body>
                <Right>             
                    <Icon name='create' onPress={this.goToEditProfile}/>
                </Right>
          </Header>
          <View style={{borderRadius: 50, alignItems: 'center'}}>
          <Image
            style={styles.photoProfile}
            source={require('../assets/cover/cover_onepiece.jpg')}
          />
          <Text>Rizky</Text>
          <View style={{marginTop : 30}}>
          
              <TouchableOpacity 
              style={styles.button}
              onPress={this.goToMangaCreation}>
              <Text style={{padding:20,color:'white'}}>My Manga Creation</Text>
              <Icon name='arrow-dropright' style={styles.nextIcon} onPress={this.goToPrevScreen}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonLogout} onPress={this.logOut}><Text style={{padding:20,color:'white'}}>Logout</Text></TouchableOpacity>
          </View>

          </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  photoProfile:{
    borderRadius: 75,
    height: 150,
    width : 150,
    margin: 20
  },
  button:{
    borderRadius:20,
    backgroundColor:'#273c75',
    flexDirection:"row",
    marginTop :1,
    width: fitScreen*0.97,
    justifyContent : "space-between"
  },
  buttonLogout:{
    borderRadius:20,
    backgroundColor:'#e84118',
    flexDirection:"row",
    marginTop :1,
    width: fitScreen*0.97,
    justifyContent : "space-between"
  },
  nextIcon:{
    color: 'white',
    alignSelf:'flex-end',
    margin:10
  }
})
