import React, { Component } from 'react';
import { View, Text,Image,Dimensions,StyleSheet,TouchableOpacity,FlatList,AsyncStorage } from 'react-native';
import { Header, Left, Body, Right, Icon, CardItem,Card } from 'native-base';
import jwt_decode from 'jwt-decode';
const fitScreen = Dimensions.get('window').width;
import * as actionGetMangaUser from './../redux/actions/actionGetMangaUser'
import {connect} from 'react-redux'
import axios from 'axios'

 class MangaCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listManga:[
            {totalChap:'15 Chapter', image:require('../assets/cover/boku.jpg'), title:'Boku No Pico'},
            {totalChap:'14 Chapter', image:require('../assets/cover/cover_onepiece.jpg'), title:'One Piece'},
            {totalChap:'13 Chapter', image:require('../assets/cover/sunarto.jpg'),title:'Sunarto'},
            {totalChap:'12 Chapter', image:require('../assets/cover/bocahLaknat.jpg'),title:'Bocah Laknat'}],
    };
  }  
  
  goToPrevScreen = () =>  this.props.navigation.goBack();
  goToEditScreen = (idManga) => this.props.navigation.navigate('ManageManga',idManga)
  goToCreateManga = () => this.props.navigation.navigate('CreateManga')

  componentDidMount = async() =>{
    const token = await AsyncStorage.getItem('user-token')
    const id = jwt_decode(token)
    await this.props.getMangaUser(id.userId,token)
    console.log(this.props.mangaUserLocal.mangaUser)
  }

  deleteManga = async(idManga) =>{
    const token = await AsyncStorage.getItem('user-token')
    const id = jwt_decode(token)
    await axios.delete(`http://192.168.73.2:5000/mangaky/manga/delete/${idManga}`,{
      headers : {"Authorization" : `Bearer ${token}`}
    }) 
    await this.props.getMangaUser(id.userId,token)
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Header style ={{backgroundColor:'#0984e3'}}>
          <Left>
            <TouchableOpacity transparent>
              <Icon name='arrow-back'
              onPress={this.goToPrevScreen} />
            </TouchableOpacity>
          </Left>
          <Body>
              <Text>Komiky</Text>
              <Text>My Manga Creation</Text>
          </Body>
          <Right></Right>
        </Header>
         <FlatList
          style={styles.listChapter}
          data={this.props.mangaUserLocal.mangaUser}
          renderItem={({item})=>
          <Card>
            <CardItem>
              <TouchableOpacity >
                <View style={{flexDirection:'row'}}>
                  <Image
                  style={styles.imageChapter}
                  source={{uri:`http://192.168.73.2:5000/mangaky/${item.cover}`}}/>
                  <View>
                    <Text style={styles.titleChapter}>{item.title}</Text>
                    <View style={{marginTop: 20,flexDirection:'row'}}>
                      <TouchableOpacity style={styles.buttonManage}onPress={()=>this.goToEditScreen(item.id)}>
                        <Icon name='copy' style={{color:'white',marginLeft:10}}></Icon>
                        <Text style={{ color:'white' }}>Manage</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonDelete}onPress={()=>this.deleteManga(item.id)}>
                        <Icon name='trash' style={{color:'white',marginLeft:10}}></Icon>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </CardItem>
          </Card>
          }
          keyExtractor = {(item,index)=>index.toString()}
        />
       <TouchableOpacity style={styles.buttonAdd}
       onPress={this.goToCreateManga}>
         <Icon name='add' style={{color:'white',padding:10}}></Icon>
       </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    banner:{
        height : 200,
        width : fitScreen,
        padding: 10,
    },
    imageChapter:{
        height:100,
        width:80,
        marginBottom:5 , 
        marginRight: 5,
      },
    listChapter:{
        margin : 10
    },
    titleChapter:{
        fontWeight:'bold',
        marginBottom:5 , 
        marginRight: 5
      },
    dateChapter :{
        marginRight: 5
    },
    buttonAdd:{
      borderRadius:30,
      alignItems: 'center',
      width:50,
      backgroundColor:'orange',
      margin:20,
      alignSelf:'flex-end'
    },
    buttonManage :{
      width:110,
      height:40,
      flexDirection:'row',
      borderRadius : 5, 
      backgroundColor:'#2980b9',
      alignItems:'center'
    }, 
    buttonDelete :{
      width:40,
      height:40,
      flexDirection:'row',
      borderRadius : 5, 
      backgroundColor:'#ee5253',
      alignItems:'center'
    }, 
    
})
const mapStateToProps = state => {
  return {
    mangaUserLocal: state.mangaUser, // redux/reducer/index.js
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMangaUser : (params,token) => dispatch(actionGetMangaUser.getMangaUser(params,token))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MangaCreation);