import React, { Component } from 'react';
import { View, Text,Image,Dimensions,StyleSheet,TouchableOpacity,FlatList,AsyncStorage } from 'react-native';
import { Header, Left, Body, Right, Icon, CardItem,Card } from 'native-base';
import jwt_decode from 'jwt-decode';
const fitScreen = Dimensions.get('window').width;
import * as actionGetPages from './../redux/actions/actionGetPages'
import {connect} from 'react-redux'
import axios from 'axios'

 class ManagePage extends Component {
  constructor(props) {
    super(props);
    this.state = ''
  }  
  
  goToPrevScreen = () =>  this.props.navigation.goBack();
  goToEditScreen = (idManga) => this.props.navigation.navigate('ManageManga',idManga)
  goToCreateManga = () => this.props.navigation.navigate('CreateManga')
  goToAddPages = () => {
      const params={
          idManga : this.props.navigation.state.params.idManga,
          numberChapter : this.props.getPagesLocal.pages[0].chapter} 
      this.props.navigation.navigate('AddPage',params)
    }

  componentDidMount = async() =>{
    const token = await AsyncStorage.getItem('user-token')
    const param = this.props.navigation.state.params
    await this.props.getPages(param.idManga,param.idChapter,token)
  }

  deletePage = async(idPage) =>{
    const token = await AsyncStorage.getItem('user-token')
    const id = jwt_decode(token)
    await axios.delete(`http://192.168.73.2:5000/mangaky/chapter/image/delete/${idPage}`,{
      headers : {"Authorization" : `Bearer ${token}`}
    })
    const param = this.props.navigation.state.params
    await this.props.getPages(param.idManga,param.idChapter,token)
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
              <Text>Manga Pages</Text>
          </Body>
          <Right></Right>
        </Header>
         <FlatList
          style={styles.listChapter}
          data={this.props.getPagesLocal.pages}
          renderItem={({item})=>
          <Card>
            <CardItem>
              <TouchableOpacity >
                <View style={{flexDirection:'row'}}>
                  <Image
                  style={styles.imageChapter}
                  source={{uri:`http://192.168.73.2:5000/mangaky/${item.image}`}}/>
                  <View>
                    <Text style={styles.titleChapter}>Page {item.page}</Text>
                    <View style={{marginTop: 20,flexDirection:'row'}}>
                      <TouchableOpacity style={styles.buttonDelete}onPress={()=>this.deletePage(item.id)}>
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
       onPress={this.goToAddPages}>
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
      getPagesLocal: state.pages, // redux/reducer/index.js
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      getPages : (manga,chapter,token) => dispatch(actionGetPages.getPages(manga,chapter,token)), // redux/action
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ManagePage);