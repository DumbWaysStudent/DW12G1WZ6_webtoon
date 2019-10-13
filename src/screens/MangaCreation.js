import React, { Component } from 'react';
import { View, Text,Image,Dimensions,StyleSheet,TouchableOpacity,FlatList,Button } from 'react-native';
import { Header, Left, Body, Right, Icon, CardItem,Card } from 'native-base';

const fitScreen = Dimensions.get('window').width;



export default class MangaCreation extends Component {
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
  goToEditScreen = () => this.props.navigation.navigate('EditChapter')
  goToCreateManga = () => this.props.navigation.navigate('CreateManga')

  render() {
    return (
      <View style={{flex:1}}>
        <Header style ={{backgroundColor:'light-gray'}}>
          <Left>
            <TouchableOpacity transparent>
              <Icon name='arrow-back'
              onPress={this.goToPrevScreen} />
            </TouchableOpacity>
          </Left>
          <Body>
              <Text>My Manga Creation</Text>
          </Body>
          <Right></Right>
        </Header>
         <FlatList
          style={styles.listChapter}
          data={this.state.listManga}
          renderItem={({item})=>
          <Card>
            <CardItem>
              <TouchableOpacity onPress={this.goToEditScreen}>
                <View style={{flexDirection:'row'}}>
                  <Image
                  style={styles.imageChapter}
                  source={item.image}/>
                  <View>
                  <Text style={styles.titleChapter}>{item.title}</Text>
                  <Text style={styles.dateChapter}>{item.totalChap}</Text>
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
        width:100,
        marginBottom:5 , 
        marginRight: 5,
      },
    listChapter:{
        margin : 10
    },
    titleChapter:{
        marginBottom:10 , 
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
    }
    
})