import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet,TouchableOpacity,Image } from 'react-native';
import { Form,Item, Input, Label,Header, Left, Body, Right,Icon } from 'native-base';

export default class CreateManga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listManga:[
        {date:'15 Agustus 2028', image:require('../assets/cover/boku.jpg'), chapter:'Chapter 190'},
        {date:'14 Agustus 2028', image:require('../assets/cover/cover_onepiece.jpg'),chapter:'Chapter 189'},
        {date:'13 Agustus 2028', image:require('../assets/cover/sunarto.jpg'),chapter:'Chapter 188'}],
    };
  }

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
              <Text>Creaate Manga</Text>
          </Body>
          <Right>
            <TouchableOpacity transparent>
              <Icon name='checkmark' />
            </TouchableOpacity>
          </Right>
        </Header>
      <View>
        <Label style={{padding : 15}}>Title</Label>
        <Form>
          <Item>
            <Input style={styles.form}
              placeholder ='Input Title Manga'/>
          </Item>
        </Form>
      </View>
      <View style={styles.layout}>
        <Label style={{marginBottom:15}}>Chapter</Label>
        <FlatList
          style={styles.flatlist}
          data={this.state.listManga}
          renderItem={({item})=>
          <TouchableOpacity onPress={this.toDetailScreen} style={{flexDirection:'row'}}>
            <Image
            onPress
            style={styles.coverMangaFav}
            source={item.image}/>
            <View>
              <Text style={styles.titleMangaFav}>{item.chapter}</Text>
              <Text style={styles.titleMangaFav}>{item.date}</Text>
            </View>
          </TouchableOpacity>
          }
          keyExtractor = {(item,index)=>index.toString()}
        />
        <View style={{marginBottom : 20}}>
          <TouchableOpacity style={styles.button}>
            <Text style={{color:'white'}}>
              Add Chapter
            </Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>

    );
  }
}
const styles = StyleSheet.create({
  layout :
  {
    padding:15
  },
  flatlist:{
    flexDirection:"row"
  },
  coverMangaFav:{
    height:70,
    width:70,
    marginBottom:5 , 
    marginRight: 5,
  },
  form:{
    marginRight:10,
    borderColor : 'grey',
    borderWidth : 1
  },
  button:{
    alignItems : 'center',
    marginTop:20,
    padding : 20,
    backgroundColor : 'orange',
    justifyContent : 'center',
    },
})