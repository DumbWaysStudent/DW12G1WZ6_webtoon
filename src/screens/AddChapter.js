import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet,TouchableOpacity,Image,ScrollView,AsyncStorage } from 'react-native';
import { Form,Item, Input, Label,Header, Left, Body, Right,Icon,Textarea } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import MangaCreation from './MangaCreation';
export default class AddChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number : '',
      title : '',
    };
  }

  

  addChapter = async() =>{
    const dataManga = this.props.navigation.state.params
    const formData = new FormData()
    const res = await axios.post(`http://192.168.73.2:5000/mangaky/chapter/create/${dataManga}`,{
        name:this.state.title,
        number:this.state.number,
        manga:dataManga
    })
    console.log(this.state)
    
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
              <Text>Add Chapter</Text>
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
              placeholder ='Input Title Chapter'
              onChangeText={title => this.setState({title : title})}/>
          </Item>
        </Form>
        <Label style={{padding : 15}}>Number Chapter</Label>
        <Form>
          <Item>
            <Input style={styles.form}
              placeholder ='Input Number Chapter'
              onChangeText={number => this.setState({number : number})}/>
          </Item>
        </Form>
      </View>
      <View style={styles.layout}>  
        <View style={{marginBottom : 20}}>
          <TouchableOpacity style={styles.button}
          onPress ={this.addChapter}>
            <Text style={{color:'white'}}>
              Add Chapter
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