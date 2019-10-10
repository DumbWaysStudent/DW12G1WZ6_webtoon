import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,Image,Dimensions } from 'react-native';
import { Header, Left, Body, Right, Icon, } from 'native-base'

const fitScreen = Dimensions.get('window').width;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  goToEditProfile =()=> this.props.navigation.navigate('EditProfile')
  goToMangaCreation =()=>this.props.navigation.navigate('MangaCreation')

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
            onPress={this.goToMangaCreation}><Text style={{padding:20}}>My Manga Creation</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={{padding:20}}>Logout</Text></TouchableOpacity>
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
    marginTop :1,
    width: fitScreen,
    borderColor: 'gray',
    borderWidth: 1
  }
})
