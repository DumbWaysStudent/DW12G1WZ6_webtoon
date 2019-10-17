import React, { Component } from 'react';
import { View, Text,TouchableOpacity,FlatList,Image,StyleSheet,Dimensions } from 'react-native';
import { Header, Left, Body, Right, Icon, CardItem,Card } from 'native-base';

const fitScreen = Dimensions.get('window').width;

export default class ManageManga extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listManga:[
          {date:'14 Agustus 2028', image:require('../assets/cover/cover_onepiece.jpg'),chapter:'Chapter 189'},
        ]
    };
  }
  
  goToChapterScreen = ()=>this.props.navigation.navigate('Chapters')

  render() {
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
              data={this.state.listManga}
              renderItem={({item})=>
              <TouchableOpacity style={{flexDirection:'row'}}
                onPress={this.goToDetailChapter}>
                <Image
                style={styles.imageChapter}
                source={item.image}/>
                <View >
                  <Text style={styles.titleChapter}>Manage Manga</Text>
                   <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>TITLE : </Text>
                    <Text style={styles.dateChapter}>ONE PIECE </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>AUTHOR(S) : </Text>
                    <Text style={styles.dateChapter}>DEDE IKI </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>GENRE : </Text>
                    <Text style={styles.dateChapter}>ADVENTURE </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.dateChapter}>CREATED AT : </Text>
                    <Text style={styles.dateChapter}>2019-10-18 </Text>
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
              onPress={this.goToMangaCreation}>
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