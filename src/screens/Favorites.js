import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet,TouchableOpacity,Image,AsyncStorage } from 'react-native';
import { Icon,Form,Item, Input } from 'native-base';
import {connect} from 'react-redux'
import jwt_decode from 'jwt-decode';
import * as actionMyFavorites from './../redux/actions/actionsMyFavorites'
class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
        input :''
    };
  }

  searchManga=()=>{
    const listManga= this.state.listManga
    const result = listManga.filter(listManga=>{
       return listManga.title.toLowerCase().includes(this.state.input)
    })
    this.setState({
      listManga : [...result]
    })
  }
  
  componentDidMount= async()=>{
    const token = await AsyncStorage.getItem('user-token')
    const id = jwt_decode(token)
   
    await this.props.getMyFavorites(id.userId)
    console.log(this.props.myFavoritesLocal)
  }

  render() {
    return (
      <View >
        <Form>
          <Item>
            <Input
              autoCapitalize ='none'
              placeholder ='Search..'
              onChangeText={input => this.setState({input : input})}/>
            <Icon name='ios-search' onPress={this.searchManga}></Icon>
          </Item>
        </Form>

        <FlatList
          style={styles.flatlist}
          data={this.props.myFavoritesLocal.myFavorites}
          renderItem={({item})=>
          <TouchableOpacity onPress={this.toDetailScreen} style={{flexDirection:'row'}}>
            <Image
            onPress
            style={styles.coverMangaFav}
            source={{uri :`http://192.168.73.2:5000/mangaky/${item.mangas.cover}`}}/>
            <View>
              <Text style={styles.titleMangaFav}>{item.mangas.title}</Text>
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
const mapStateToProps = state => {
  return {
    myFavoritesLocal : state.myFavorites
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMyFavorites : (params) => dispatch(actionMyFavorites.getMyFavorites(params))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);