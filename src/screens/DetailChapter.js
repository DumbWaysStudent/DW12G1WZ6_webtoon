import React, { Component } from 'react';
import { View, Text, TouchableOpacity,FlatList,Dimensions,StyleSheet,Image } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

const fitScreen = Dimensions.get('window').width;

const shareOptions = {
    title: 'Title',
    message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
    url: 'www.example.com',
    subject: 'Subject'
  };

export default class DetailChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listManga:[
            {image:require('../assets/manga/01.jpg')},
            {image:require('../assets/manga/02.jpg')},
            {image:require('../assets/manga/03.jpg')},
            {image:require('../assets/manga/04.jpg')},
            {image:require('../assets/manga/05.jpg')},
        ],
    };
  }

  onSharePress = () => Share.share(shareOptions);
  goToPrevScreen = () =>  this.props.navigation.goBack();

  render() {
    return (
        <View>
            <Header style ={{backgroundColor:'light-gray'}}>
                <Left>
                    <TouchableOpacity transparent>
                    <Icon name='arrow-back'
                    onPress={this.goToPrevScreen} />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Text>One Piece : Chapter 123</Text>
                </Body>
                <Right>
                    <TouchableOpacity transparent>
                        <Icon name='share' 
                        onPress={this.onSharePress}/>
                    </TouchableOpacity>
                </Right>
            </Header>
            <FlatList
                data={this.state.listManga}
                renderItem={({item})=>
                <View>
                    <Image
                    style={styles.imageChapter}
                    source={item.image}/>
                  </View>
                }
                keyExtractor = {(item,index)=>index.toString()}
            />
        </View>
    );
  }
}
const styles = StyleSheet.create({
    imageChapter :{
    width : fitScreen,
    height : 700,
    marginBottom: 20,}
})