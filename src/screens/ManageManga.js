import React, { Component } from 'react';
import { View, Text,TouchableOpacity,FlatList,Image,StyleSheet,Dimensions } from 'react-native';
import { Header, Left, Body, Right, Icon, CardItem,Card } from 'native-base';

const fitScreen = Dimensions.get('window').width;

import {connect} from 'react-redux'

import * as actionGetDetailManga from './../redux/actions/actionGetDetailManga'

 
 class ManageManga extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listManga:[
          {date:'14 Agustus 2028', image:require('../assets/cover/cover_onepiece.jpg'),chapter:'Chapter 189'},
        ]
    };
  }
  
  goToEditManga = () => this.props.navigation.navigate('EditManga',this.props.navigation.state.params)
  goToChapterScreen = ()=>this.props.navigation.navigate('Chapters',this.props.navigation.state.params)

  componentDidMount = async() =>{
    const dataManga = this.props.navigation.state.params
    console.log(dataManga)
    this.props.getDetailManga(dataManga)
  }

  render() {
    const dataManga = this.props.getDetailMangaLocal.detailManga
    return (
      <View>
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
        <Card style={{width:340,alignSelf:'center'}}>
        <FlatList
              style={{padding:10}}
              data={dataManga}
              renderItem={({item})=>
              <TouchableOpacity style={{flexDirection:'row'}}
                onPress={this.goToDetailChapter}>
                <Image
                style={styles.imageChapter}
                source={{uri:`http://192.168.73.2:5000/mangaky/${item.cover}`}}/>
                <View >
                  <Text style={styles.titleChapter}>Manage Manga</Text>
                   <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>TITLE : </Text>
                    <Text style={styles.dateChapter}>{item.title} </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>AUTHOR(S) : </Text>
                    <Text style={styles.dateChapter}>{item.users.name} </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>GENRE : </Text>
                    <Text style={styles.dateChapter}>{item.genre}</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>CREATED AT : </Text>
                    <Text style={styles.dateChapter}>{item.createdAt} </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>STATUS : </Text>
                    <Text style={styles.dateChapter}>ONGOING </Text>
                  </View>
                </View>
              </TouchableOpacity>
              }
              keyExtractor = {(item,index)=>index.toString()}
            />
        </Card>
        <TouchableOpacity 
              style={styles.button}
              onPress={this.goToEditManga}>
              <Text style={{padding:20,color:'white'}}>Edit Your Manga</Text>
              <Icon name='arrow-dropright' style={styles.nextIcon} onPress={this.goToPrevScreen}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonLogout} onPress={this.goToChapterScreen}>
                <Text style={{padding:20,color:'white'}}>Manage Chapter</Text></TouchableOpacity>
      </View>
    );
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
      marginTop: 15, 
      backgroundColor:'#e84118',
      alignItems:'center'
    },   
    label:{
      color:'white',
      fontWeight:'bold',
      padding :10},
    card:{
      margin:10
    },
    button:{
        borderRadius:20,
        backgroundColor:'#273c75',
        flexDirection:"row",
        marginTop :1,
        width: fitScreen*0.97,
        justifyContent : "space-between",
        alignSelf:'center'
      },
      buttonLogout:{
        borderRadius:20,
        backgroundColor:'#e84118',
        flexDirection:"row",
        marginTop :1,
        width: fitScreen*0.97,
        justifyContent : "space-between",
        alignSelf:'center'
      },
      nextIcon:{
        color: 'white',
        alignSelf:'flex-end',
        margin:10
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
)(ManageManga);