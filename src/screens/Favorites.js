import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet,TouchableOpacity,Image } from 'react-native';
import { Icon,Form,Item, Input } from 'native-base';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listManga:[
        {title:'Boku No Pico', image:require('../assets/cover/boku.jpg'), favorites:'90+ Favorites'},
        {title:'One Piece', image:require('../assets/cover/cover_onepiece.jpg'),favorites:'100+ Favorites'},
        {title:'Sunarto', image:require('../assets/cover/sunarto.jpg'),favorites:'70+ Favorites'},
        {title:'Bocah Laknat', image:require('../assets/cover/bocahLaknat.jpg'),favorites:'80+ Favorites'}],
    };
  }

  render() {
    return (
      <View >
        <Form>
          <Item>
            <Input
              autoCapitalize ='none'
              placeholder ='Search..'/>
            <Icon name='ios-search'></Icon>
          </Item>
        </Form>

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
              <Text style={styles.titleMangaFav}>{item.title}</Text>
              <Text style={styles.titleMangaFav}>{item.favorites}</Text>
            </View>
          </TouchableOpacity>
          }
          keyExtractor = {(item,index)=>index.toString()}
        />

        <View style={{marginBottom : 20}}>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flatlist:{
    padding : 10,
    flexDirection:"row"
  },
  coverMangaFav:{
    height:100,
    width:100,
    marginBottom:5 , 
    marginRight: 5,
  }
})