import React, { Component } from 'react';
import { View, Text,Image,Dimensions,StyleSheet,TouchableOpacity,FlatList,AsyncStorage,ScrollView } from 'react-native';
import { Header, Left, Body, Right, Icon,Card, CardItem } from 'native-base';
import {connect} from 'react-redux'
import * as actionGetDetailManga from './../redux/actions/actionGetDetailManga'
import * as actionGetChapterMangas from './../redux/actions/actionGetChapterMangas'

const fitScreen = Dimensions.get('window').width;

class Chapters extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listManga:[
          {date:'14 Agustus 2028', image:require('../assets/cover/cover_onepiece.jpg'),chapter:'Chapter 189'},
        ]
    };
  }

  goToEditChapter = () => this.props.navigation.navigate('EditChapter')
  goToAddPageScreen = () => this.props.navigation.navigate('')
  goToAddChapter = () => this.props.navigation.navigate('AddChapter',this.props.navigation.state.params)
  goToAddPage = () => this.props.navigation.navigate('AddPage')


  goToManageChapter = (idManga,idChapter) => {
    const params ={
      idManga : idManga,
      idChapter : idChapter
    }
     console.log(params)
    this.props.navigation.navigate('ManagePage',params)
  }

  componentDidMount = async() =>{
    const token = await AsyncStorage.getItem('user-token')
    const dataManga = this.props.navigation.state.params
    console.log(token)
    this.props.getDetailManga(dataManga)
    this.props.getChapterMangas(dataManga,token)
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
            <Text>{dataManga.length >0?dataManga[0].title:null}</Text>
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
              </View>
            </TouchableOpacity>
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
              onPress={()=>this.goToManageChapter(dataManga[0].id,item.number)}
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
      <TouchableOpacity 
        style={styles.button}
        onPress={this.goToAddChapter}>
        <Text style={{padding:20,color:'white'}}>Add Chapter</Text>
      </TouchableOpacity>
    </ScrollView>
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
    nextIcon:{
      color: 'white',
      alignSelf:'flex-end',
      margin:10
    }  
})
const mapStateToProps = state => {
  return {
    getDetailMangaLocal: state.getDetailManga, // redux/reducer/index.js
    getChapterMangasLocal : state.chapterMangas
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getDetailManga : (params) => dispatch(actionGetDetailManga.getDetailManga(params)), // redux/action
    getChapterMangas : (params,token) => dispatch(actionGetChapterMangas.getChaptersMangas(params,token))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chapters);