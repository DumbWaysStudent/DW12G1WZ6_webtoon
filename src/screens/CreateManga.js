import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet,TouchableOpacity,Image,ScrollView,AsyncStorage } from 'react-native';
import { Form,Item, Input, Label,Header, Left, Body, Right,Icon,Textarea } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import MangaCreation from './MangaCreation';
export default class CreateManga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input : '',
      title : '',
      synopsis :'',
      genre : '',
      cover : ''
    };
  }

  handleCamera=()=>{
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let tmpPhoto = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };
          const source = response;
          this.setState({
            cover: tmpPhoto,
          });
        }
      });
  }
  addManga = async() =>{
    const token = await AsyncStorage.getItem('user-token')
    const id = jwt_decode(token)
    const formData = new FormData()
    formData.append('title',this.state.title)
    formData.append('synopsis',this.state.synopsis)
    formData.append('genre',this.state.genre)
    formData.append('cover',this.state.cover)
    const res = await axios.post(`http://192.168.73.2:5000/mangaky/manga/add/${id.userId}`,formData)
    console.log(res)
    
  }

  render() {
    return (
    <ScrollView>
        <Header style ={{backgroundColor:'light-gray'}}>
          <Left>
            <TouchableOpacity transparent>
              <Icon name='arrow-back'
              onPress={this.goToPrevScreen} />
            </TouchableOpacity>
          </Left>
          <Body>
              <Text>Create Manga</Text>
          </Body>
          <Right>
            <TouchableOpacity transparent>
              <Icon name='checkmark' />
            </TouchableOpacity>
          </Right>
        </Header>
      <View>
        <Label style={{padding : 15}}>Title</Label>
        <Form>
          <Item>
            <Input style={styles.form}
              placeholder ='Input Title Manga'
              onChangeText={title => this.setState({title : title})}/>
          </Item>
        </Form>
        <Label style={{padding : 15}}>Synopsis Manga</Label>
        <Form>
          <Textarea rowSpan={3} 
          bordered 
          style={{marginLeft:15,marginRight:15}}
          placeholder='Input Synopsis Manga'
          onChangeText={synopsis => this.setState({synopsis:synopsis})} />
        </Form>
        <Label style={{padding : 15}}>Genre</Label>
        <Form>
          <Item>
            <Input style={styles.form}
              placeholder ='Input Genre Manga'
              onChangeText={genre => this.setState({genre : genre})}/>
          </Item>
        </Form>
        <Label style={{padding : 15}}>Cover</Label>
        <Form>
          <Item style={{flexDirection:'row'}}>
            <Input style={styles.formCover}
              placeholder ='Upload Cover Manga'
              value={this.state.cover.uri}/>
            <TouchableOpacity style={styles.buttonUpload} onPress={this.handleCamera}>
            </TouchableOpacity>
          </Item>
        </Form>
      </View>
      <View style={styles.layout}>  
        <View style={{marginBottom : 20}}>
          <TouchableOpacity style={styles.button}
          onPress ={this.addManga}>
            <Text style={{color:'white'}}>
              Add Manga
            </Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

    );
  }
}
const styles = StyleSheet.create({
  layout :
  {
    padding:15
  },
  flatlist:{
    flexDirection:"row"
  },
  coverMangaFav:{
    height:70,
    width:70,
    marginBottom:5 , 
    marginRight: 5,
  },
  form:{
    marginRight:15,
    borderColor : 'grey',
    borderWidth : 1
  },
  formCover :{
    
    borderColor : 'grey',
    borderWidth : 1
  },
  button:{
    alignItems : 'center',
    marginTop:20,
    padding : 20,
    backgroundColor : '#273c75',
    justifyContent : 'center',
    },
    buttonUpload :{
      width:50,
      height:50,
      backgroundColor:'red',
      marginRight:15
    }
})