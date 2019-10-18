import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { View, Text,Image,Dimensions,FlatList,StyleSheet,AsyncStorage,ScrollView } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import { Form, Item, Input, Label,Icon,  Card, CardItem, Body  } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'
import jwt from 'react-native-pure-jwt'

const width = Dimensions.get('window').width;


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listManga:[],
      latestChapters:[]
    };
  }

  toDetailScreen=()=>{
    this.props.navigation.navigate('Details')
  }

  getLatestMangas = () => {
    axios.get('http://192.168.73.2:5000/mangaky/chapter/latest')
    .then(res =>{
      const result = res.data
      this.setState({
        latestChapters:[...result]
      })
    })
  }

  getMyFavoriteMangas = async() => {
    const token = await AsyncStorage.getItem('user-token')
    const id = jwt_decode(token)
    console.log(id.userId)
    axios.get(`http://192.168.73.2:5000/mangaky/manga/myfavorites/${id.userId}`)
    .then(res =>{
      const result = res.data
      this.setState({
        listManga:[...result]
      })
    })
  }
 
  componentDidMount(){
    axios.get('http://192.168.73.2:5000/mangaky/chapter/latest')
    .then(res =>{
      const result = res.data
      this.setState({
        latestChapters:[...result]
      })
    })
    this.getMyFavoriteMangas()
  }

  render() {
    return (
      <ScrollView style={{padding : 5}}>
        <Form>
          <Item>
            <Input
              autoCapitalize ='none'
              placeholder ='Search..'/>
            <Icon name='ios-search'></Icon>
          </Item>
        </Form>
        <View style={{height : 200, marginTop : 20}}>
        
        <ImageSlider
          autoPlayWithInterval={3000}
          customSlide={({ index, item}) => (
            <View key={index}>
              
              <Image source={{ uri: item }} style={{height:300,width}} />
              
            </View>
          )}
          images={[
            'https://avt.mkklcdnv3.com/avatar_225/21424-ls917810.jpg',
            'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
            'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
        ]}/>
        </View>
        <Card>
          <View style={{flexDirection:"row"}}>
            <View style={{backgroundColor: '#273c75', alignSelf:'baseline'}}>
              <Text style={styles.label}>Your Favorite Manga</Text>
            </View>
            <Image
              style={{width:30, height:30, marginLeft:180}} 
              source={require('../assets/icon/bookmark.png')}/>
          </View>
              <FlatList
                showsHorizontalScrollIndicator ={false}
                style={styles.horizontalFlatlist}
                horizontal={true}
                data={this.state.listManga}
                renderItem={({item})=>
                <TouchableOpacity onPress={this.toDetailScreen}>
                  <Image
                  onPress
                  style={styles.coverMangaFav}
                  source={{uri:item.cover}}/>
                  <Text style={styles.titleMangaFav}>{item.title}</Text>
                </TouchableOpacity>
                }
                keyExtractor = {(item,index)=>index.toString()}
              />
        </Card>
      

        <View style={{marginBottom : 20}}>
          <Card>
            <View style={{backgroundColor: '#273c75', alignSelf:'baseline'}}>
              <Text style={styles.label}>Recently Updated Manga</Text>
            </View>
              {this.state.latestChapters.map((item,index)=>{
                return(
                  <TouchableOpacity key={index} 
                  style={{flexDirection:"row",padding : 10}}
                  onPress={this.toDetailScreen}>
                    {/* {console.log(item.cover)} */}
                    <Image
                      style={styles.coverAll}
                      source={{uri: item.cover}}/>
                      <View>
                        <Text style={{fontWeight:'bold'}}>{item.title}</Text>
                        <Text>Chapter {item.number}</Text>
                      </View>
                  </TouchableOpacity>
                  )
                }
              )}
          </Card>
          
        </View>
        
      </ScrollView>
      
    );
  }
}
const styles = StyleSheet.create({
  horizontalFlatlist:{
    padding : 10
  },
  coverMangaFav:{
    height:100,
    width:100,
    marginBottom:5 , 
    marginRight: 5,
  },
  coverAll:{
    height:100,
    width:80,
    marginBottom:5 , 
    marginRight: 5,
  },
  titleMangaFav:{
    marginBottom:10 , 
    marginRight: 5
  },
  buttonRead:{
    borderRadius:5,
    padding: 10,
    height: 40, 
    marginTop: 10 ,
    backgroundColor :'orange'},
  label:{
    color:'white',
    fontWeight:'bold',
    padding :10}

})