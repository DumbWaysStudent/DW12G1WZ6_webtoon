import React, { Component } from 'react';
import { View, Text,Image,Dimensions,StyleSheet,TouchableOpacity,FlatList,Share } from 'react-native';
import { Header, Left, Body, Right, Icon,Card, CardItem } from 'native-base';

const fitScreen = Dimensions.get('window').width;

const shareOptions = {
  title: 'Title',
  message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
  url: 'www.example.com',
  subject: 'Subject'
};

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listManga:[
          {date:'14 Agustus 2028', image:require('../assets/cover/cover_onepiece.jpg'),chapter:'Chapter 189'},
        ]
    };
  }  
  
  onSharePress = () => Share.share(shareOptions);
  goToDetailChapter = () => this.props.navigation.navigate('DetailsChapter')
  goToPrevScreen = () =>  this.props.navigation.goBack();
  
  componentDidMount(){
    const dataManga = this.props.navigation.state.params
    console.log(dataManga)
  }
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
                  <Text style={styles.titleChapter}>ONE PIECE</Text>
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
                  <TouchableOpacity style={styles.buttonFavorite}>
                    <Icon name='star' style={{marginLeft: 10,color:'white'}}/>
                    <Text style={{padding :10, color:'white' }}>Mark As Favorite</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              }
              keyExtractor = {(item,index)=>index.toString()}
            />
       
        </Card>
        <Card style={styles.card}>
          <View style={{backgroundColor: '#273c75', alignSelf:'baseline'}}>
            <Text style={styles.label}>Manga's Chapters</Text>
          </View>
          <View style={{padding:10}}>
            <View style={{flexDirection:'row',marginBottom:5}}>
            <Image
              style={{width:30, height:30, marginRight:10}} 
              source={require('../assets/icon/chapter.png')}/>
                <View>
                <Text onPress={this.goToDetailChapter}>Chapter 110 : Lorem ipsum dolor sit amet</Text>
                <Text style={{color:'#7f8c8d'}}>16 August 2090</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',marginBottom:5}}>
            <Image
              style={{width:30, height:30, marginRight:10}} 
              source={require('../assets/icon/chapter.png')}/>
                <View>
                <Text onPress={this.goToDetailChapter}>Chapter 110 : Lorem ipsum dolor sit amet</Text>
                <Text style={{color:'#7f8c8d'}}>16 August 2090</Text>
              </View>
            </View>
            
          </View>
        </Card>
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
    }
    
})