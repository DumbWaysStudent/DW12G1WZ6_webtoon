import React, { Component } from 'react';
import {connect} from 'react-redux'
import { View, Text,FlatList,StyleSheet,TouchableOpacity,Image,ScrollView,AsyncStorage } from 'react-native';
import { Form,Item, Input, Label,Header, Left, Body, Right,Icon,Textarea } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as actionGetDetailManga from './../redux/actions/actionGetDetailManga'
class EditManga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input : '',
      title : '',
      synopsis :'',
      genre : '',
      cover : '',
      notUpdateCover :true
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
            notUpdateCover:false,
            cover: tmpPhoto,
          });
        }
      });
  }
  
  updateManga = async() =>{
    const dataManga = this.props.navigation.state.params
    const token = await AsyncStorage.getItem('user-token')
    const id = jwt_decode(token)
    const formData = new FormData()
    formData.append('title',this.state.title)
    formData.append('synopsis',this.state.synopsis)
    formData.append('genre',this.state.genre)
    formData.append('cover',this.state.cover)
    const res = await axios.put(`http://192.168.73.2:5000/mangaky/manga/update/${dataManga}`,formData)
    console.log(res)
  }

  componentDidMount=()=>{
    const param = this.props.navigation.state.params
    this.props.getDetailManga(param)
    console.log(this.props.getDetailMangaLocal.detailManga)
    const dataManga = this.props.getDetailMangaLocal.detailManga
    this.setState({
        title : dataManga[0].title ,
        synopsis :dataManga[0].synopsis,
        genre : dataManga[0].genre,
        cover : dataManga[0].cover,
    })
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
              <Text>Update Manga</Text>
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
             value={this.state.title}
              onChangeText={title => this.setState({title : title})}/>
          </Item>
        </Form>
        <Label style={{padding : 15}}>Synopsis Manga</Label>
        <Form>
          <Textarea rowSpan={3} 
          bordered 
          style={{marginLeft:15,marginRight:15}}
          value={this.state.synopsis}
          onChangeText={synopsis => this.setState({synopsis:synopsis})} />
        </Form>
        <Label style={{padding : 15}}>Genre</Label>
        <Form>
          <Item>
            <Input style={styles.form}
              value={this.state.genre}
              onChangeText={genre => this.setState({genre : genre})}/>
          </Item>
        </Form>
        <Label style={{padding : 15}}>Cover</Label>
        <Form>
          <Item style={{flexDirection:'row'}}>
            <Input style={styles.formCover}
              value={this.state.notUpdateCover?this.state.cover:this.state.cover.uri}/>
            <TouchableOpacity style={styles.buttonUpload} onPress={this.handleCamera}>
            </TouchableOpacity>
          </Item>
        </Form>
      </View>
      <View style={styles.layout}>  
        <View style={{marginBottom : 20}}>
          <TouchableOpacity style={styles.button}
          onPress ={this.updateManga}>
            <Text style={{color:'white'}}>
              Update Manga
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
const mapStateToProps = state => {
    return {
      getDetailMangaLocal: state.getDetailManga, // redux/reducer/index.js
    
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      getDetailManga : (params) => dispatch(actionGetDetailManga.getDetailManga(params)), // redux/action
   
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditManga);