import React, { Component } from 'react';
import { View, Text, TouchableOpacity,FlatList,Dimensions,StyleSheet,Image,AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import {connect} from 'react-redux'
import * as actionGetPages from './../redux/actions/actionGetPages'

const fitScreen = Dimensions.get('window').width;

const shareOptions = {
    title: 'Title',
    message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
    url: 'www.example.com',
    subject: 'Subject'
  };



class DetailChapter extends Component {
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

  componentDidMount = async() =>{
    const token = await AsyncStorage.getItem('user-token')
    const param = this.props.navigation.state.params
    await this.props.getPages(param.manga,param.chapter,token)
    console.log(this.props.getPagesLocal)
    
  }

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
                data={this.props.getPagesLocal.pages}
                renderItem={({item})=>
                <View>
                    <Image
                    style={styles.imageChapter}
                    source={{uri :item.image}}/>
                  </View>
                }
                keyExtractor = {(item,index)=>index.toString()}
            />
        </View>
    );
  }
}

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

const styles = StyleSheet.create({
    imageChapter :{
    width : fitScreen,
    height : 700,
    marginBottom: 20,}
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailChapter);