import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet,TouchableOpacity,Image } from 'react-native';
import { Form,Item, Input, Label,Header, Left, Body, Right,Icon } from 'native-base';

export default class EditChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listManga:[
        {date:'15 Agustus 2028', image:require('../assets/cover/boku.jpg'), chapter:'page 1'},
        {date:'14 Agustus 2028', image:require('../assets/cover/cover_onepiece.jpg'),chapter:'page 2'},
        {date:'13 Agustus 2028', image:require('../assets/cover/sunarto.jpg'),chapter:'page 3'}],
      input :''
    };
  }

  goToPrevScreen = () =>  this.props.navigation.goBack();
  goToCreateChapter = () =>  this.props.navigation.navigate('CreateChapter');
  goToCreateManga = () => this.props.navigation.navigate('CreateManga');
  goToEditChapter =()=> this.props.navigation.navigate('EditChapter');
  deleteManga = ()=>{
    let listManga = this.state.listManga;
     const deleteListManga = listManga.filter(dummy =>{
      return dummy != listManga[0]
    })
    this.setState({
      listManga : [...deleteListManga]
    })
  }
  addManga =()=>{
    const ListManga = this.state.listManga;
    const addedManga = [{
      date : '17 Agustus 2019',
      image : require('../assets/cover/sunarto.jpg'),
      chapter : this.state.input
    }]
    this.setState({
      listManga : [...ListManga,...addedManga]
    })
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
              <Text>Edit Chapter</Text>
          </Body>
          <Right></Right>
        </Header>
      <View>
        <Label style={{padding : 15}}>Name</Label>
        <Form>
          <Item>
            <Input style={styles.form}
              placeholder ='Input Chapter Number'
              onChangeText={input => this.setState({input : input})}/>
          </Item>
        </Form>
      </View>
      <View style={styles.layout}>
        <Label style={{marginBottom:15}}>Add Image</Label>
        <FlatList
          style={styles.flatlist}
          data={this.state.listManga}
          renderItem={({item})=>
          <TouchableOpacity  style={{flexDirection:'row'}}>
            <Image
            onPress
            style={styles.coverMangaFav}
            source={item.image}/>
            <View>
              <Text style={styles.page}>{item.chapter}</Text>
              <TouchableOpacity style={styles.buttonDeletePage}onPress={this.goToEditScreen}>
                <Icon name='trash' style={{color:'white',marginLeft:10}}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          }
          keyExtractor = {(item,index)=>index.toString()}
        />
        <View style={{marginBottom : 20}}>
          <TouchableOpacity style={styles.button}>
            <Text style={{color:'white'}}
            onPress ={this.addManga}>
              Add Page
            </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDel} onPress={this.deleteManga}>
            <Text style={{color:'white'}}>
              Delete Chapter
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
    backgroundColor : '#273c75',
    justifyContent : 'center',
    },
  buttonDel:{
    marginTop:5,
    alignItems : 'center',
    padding : 20,
    backgroundColor : 'red',
    justifyContent : 'center',
    },
    buttonDeletePage :{
      marginTop:12,
      width:40,
      height:40,
      flexDirection:'row',
      borderRadius : 5, 
      backgroundColor:'#ee5253',
      alignItems:'center'
    }, 
  page:{
    fontWeight:'bold'
  }
})