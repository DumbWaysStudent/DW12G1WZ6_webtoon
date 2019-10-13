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
            {date:'15 Agustus 2028', image:require('../assets/cover/boku.jpg'), chapter:'Chapter 190'},
            {date:'14 Agustus 2028', image:require('../assets/cover/cover_onepiece.jpg'),chapter:'Chapter 189'},
            {date:'13 Agustus 2028', image:require('../assets/cover/sunarto.jpg'),chapter:'Chapter 188'},
            {date:'12 Agustus 2028', image:require('../assets/cover/bocahLaknat.jpg'),chapter:'Chapter 187'}],
    };
  }  
  
  onSharePress = () => Share.share(shareOptions);
  goToDetailChapter = () => this.props.navigation.navigate('DetailsChapter')
  goToPrevScreen = () =>  this.props.navigation.goBack();
  
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
        <Image 
        source={require('../assets/banner/onePieceBanner.jpg')}
        style={styles.banner}
        />
        <Card>
          <CardItem>
            <Body>
            <FlatList
              data={this.state.listManga}
              renderItem={({item})=>
              <TouchableOpacity style={{flexDirection:'row'}}
                onPress={this.goToDetailChapter}>
                <Image
                style={styles.imageChapter}
                source={item.image}/>
                <View>
                <Text style={styles.titleChapter}>{item.chapter}</Text>
                <Text style={styles.dateChapter}>{item.date}</Text>
                </View>
              </TouchableOpacity>
              }
              keyExtractor = {(item,index)=>index.toString()}
            />
            </Body>
          </CardItem>
        </Card>
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
        margin : 5
    },
    titleChapter:{
        marginBottom:10 , 
        marginRight: 5
      },
    dateChapter :{
        marginRight: 5
    }
    
})