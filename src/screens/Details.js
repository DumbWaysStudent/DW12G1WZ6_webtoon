import React, { Component } from 'react';
import { View, Text,Image,Dimensions,StyleSheet,TouchableOpacity,FlatList,Share,ScrollView,AsyncStorage} from 'react-native';
import { Header, Left, Body, Right, Icon,Card, CardItem } from 'native-base';

import {connect} from 'react-redux'
import * as actionChapters from './../redux/actions/actionsChapters'
import * as actionGetDetailManga from './../redux/actions/actionGetDetailManga'
import * as actionGetChapterMangas from './../redux/actions/actionGetChapterMangas'
import jwt_decode from 'jwt-decode';
import * as actionMyFavorites from './../redux/actions/actionsMyFavorites'
const fitScreen = Dimensions.get('window').width;

const shareOptions = {
  title: 'Title',
  message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
  url: 'www.example.com',
  subject: 'Subject'
};

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mangaFavorite :''
    };
  }  
  
  onSharePress = () => Share.share(shareOptions)

  goToDetailChapter = (idManga,idChapter) =>{
    const param ={
      manga: idManga,
      chapter: idChapter
    } 
    this.props.navigation.navigate('DetailsChapter',param)
  } 

  goToPrevScreen = () =>  this.props.navigation.goBack();
  
  componentDidMount= async()=>{
    const dataManga = this.props.navigation.state.params
    const token = await AsyncStorage.getItem('user-token')
    this.props.getDetailManga(dataManga)
    this.props.getChapterMangas(dataManga,token)
    console.log(this.props.getChapterMangasLocal.chapterMangas)
  }
  favoriteHandler = async() =>{
    const token = await AsyncStorage.getItem('user-token')
    const id = jwt_decode(token)
    await this.props.getMyFavorites(id.userId)
    console.log(this.props.myFavoritesLocal)
  }
  formatDate = (time) => {
    var dt = new Date(time);
    var mo = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var string = `${dt.getDate()} ${mo[dt.getMonth()]} ${dt.getFullYear()}`
    return string;
  }


  render() {
    const dataManga = this.props.getDetailMangaLocal.detailManga
    const chapterMangas = this.props.getChapterMangasLocal.chapterMangas
    return (
      <ScrollView style={{padding : 5}}>
        <Header style ={{backgroundColor:'light-gray'}}>
          <Left>
            <TouchableOpacity transparent>
              <Icon name='arrow-back'
              onPress={this.goToPrevScreen} />
            </TouchableOpacity>
          </Left>
          <Body>
              <Text>One Piece</Text>
          </Body>
          <Right>
            <TouchableOpacity transparent>
              <Icon name='share' 
              onPress={this.onSharePress}/>
            </TouchableOpacity>
          </Right>
        </Header>
        
        <Card style={{margin:10}}>
              <TouchableOpacity style={{flexDirection:'row'}}
                onPress={this.goToDetailChapter}>
                <Image
                style={styles.imageChapter}
                source={{uri : `http://192.168.73.2:5000/mangaky/${dataManga.length >0?dataManga[0].cover:null}`}}
                />
                <View >
                  <Text style={styles.titleChapter}>
                    {dataManga.length >0?dataManga[0].title:null}
                  </Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>AUTHOR(S) : </Text>
                    <Text style={styles.dateChapter}>
                      {dataManga.length >0?dataManga[0].users.name:null} 
                    </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>GENRE : </Text>
                    <Text style={styles.dateChapter}>
                      {dataManga.length >0?dataManga[0].genre:null}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>CREATED AT : </Text>
                    <Text style={styles.dateChapter}>
                      {dataManga.length >0?this.formatDate(dataManga[0].createdAt):null}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>STATUS : </Text>
                    <Text style={styles.dateChapter}>ONGOING </Text>
                  </View>
                  <TouchableOpacity style={styles.buttonFavorite}>
                    <Icon name='star' style={{marginLeft: 10,color:'white'}}/>
                    <Text style={{padding :10, color:'white' }}>Mark As Favorite</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
        </Card>

        <Card style={styles.card}>
          <View style={{backgroundColor: '#273c75', alignSelf:'baseline'}}>
            <Text style={styles.label}>Manga's Synopsis</Text>
          </View>
          <View style={{padding:10}}>
            <Text>
            {dataManga.length >0?dataManga[0].synopsis:null}
            </Text>
         
          </View>
        </Card>

        <Card style={{marginBottom:30}}>
          <View style={{backgroundColor: '#273c75', alignSelf:'baseline'}}>
            <Text style={styles.label}>Manga's Chapters</Text>
          </View>
          <View style={{padding:10}}>
            <FlatList
              data={chapterMangas}
              renderItem={({item})=>
              <TouchableOpacity 
                style={{flexDirection:'row',marginBottom:5}}
                onPress={()=>this.goToDetailChapter(item.manga,item.number)}
              >
              <Image
                style={{width:30, height:30, marginRight:10}} 
                source={require('../assets/icon/chapter.png')}/>
                  <View>
                  <Text>
                    {`Chapter ${item.number} : ${item.name}`}
                  </Text>
                  <Text style={{color:'#7f8c8d'}}>{this.formatDate(item.createdAt)}</Text>
                </View>
              </TouchableOpacity>
            }
            keyExtractor = {(item,index)=>index.toString()}
            />
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    getDetailMangaLocal: state.getDetailManga, // redux/reducer/index.js
    getChapterMangasLocal : state.chapterMangas,
    myFavoritesLocal : state.myFavorites
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getDetailManga : (params) => dispatch(actionGetDetailManga.getDetailManga(params)), // redux/action
    getChapterMangas : (params,token) => dispatch(actionGetChapterMangas.getChaptersMangas(params,token)),
    getMyFavorites : (params) => dispatch(actionMyFavorites.getMyFavorites(params))
  }
}

const styles = StyleSheet.create({
    imageChapter:{
        height:150,
        width:100,
        marginBottom:5 , 
        marginRight: 5,
      },
    listChapter:{
        margin : 5
    },
    titleChapter:{
      textTransform: 'uppercase',
        fontSize: 20,
        fontWeight:'bold',
        marginBottom:5, 
        marginRight: 5
      },
    dateChapter :{
        textTransform: 'uppercase',
        marginRight: 5
    },
    buttonFavorite :{
      flexDirection:'row',
      borderRadius : 5,
      marginTop: 5, 
      backgroundColor:'#e84118',
      alignItems:'center'
    },   
    label:{
      color:'white',
      fontWeight:'bold',
      padding :10},
    card:{
      margin:10
    }
    
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);