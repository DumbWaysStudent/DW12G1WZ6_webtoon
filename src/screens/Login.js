import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity,Dimensions,AsyncStorage } from 'react-native';
import { 
  Card,
  
    Icon,
    Form, 
    Item, 
    Input,
    CardItem,
    Body,
   } from 'native-base';
import axios from 'axios'

   const width = Dimensions.get('window').width*0.95;
   const height = Dimensions.get('window').height*0.87;


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account:{
        username : 'rizky@domain.com',
        password : 'rizky'
      },
      inputUsername : '',
      inputPassword : null,
      showPassword : false
    };
  }
  showingPassword=()=>{
    this.setState({
        showPassword : !this.state.showPassword
    })
  }

  isEmail=()=>{
      let username = this.state.inputUsername
      const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailFormat.test(username)&&this.state.inputPassword!=null
  }
  authentication= async ()=>{
    const inputUsername = this.state.inputUsername
    const inputPassword = this.state.inputPassword
    const response = await axios.post('http://192.168.73.2:5000/mangaky/login',{
      email : inputUsername,
      password : inputPassword
    })
     await AsyncStorage.setItem('user-token',response.data.token)
     const token = await AsyncStorage.getItem('user-token')
     this.props.navigation.navigate('Home')
  }
  render() {
    return (
      <View style = { styles.container }>
        <View style={styles.coba}>
        <Image style={styles.logo}
       source = {require('./../assets/logo.png')}/>
        <Form style={styles.padding} >
            <Item>
                <Input
                    autoCapitalize ='none'
                    placeholder ='Masukan Emai'
                    onChangeText={text => this.setState({inputUsername : text})}
                />
            </Item>
            <Item>
                <Input
                    secureTextEntry = {!this.state.showPassword}
                    autoCapitalize ='none'
                    placeholder ='Masukan Password'
                    onChangeText={text => this.setState({inputPassword : text})}
                />
                {!this.state.showPassword?
                <Icon name='ios-eye' onPress={this.showingPassword}/>:
                <Icon name='ios-eye-off' onPress={this.showingPassword}/>}
                
            </Item>            
        </Form>
        {this.isEmail(this.state.inputUsername)?
            <TouchableOpacity
            rounded
            style = {styles.button}
            onPress={this.authentication}>
                <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>:
             <TouchableOpacity light
             style ={styles.disabledButton}>
                <Text style={styles.textButton}>Disabled</Text>
             </TouchableOpacity>
        }
        </View>
      </View>
    );
    }
}
const styles = StyleSheet.create({
  container:
  {   
    justifyContent:'center',
    flex: 1,
    backgroundColor: '#0fbcf9' // Set your own custom Color
  },
  coba:{
    borderRadius:10,
    elevation:10,
    alignSelf:'center',
    width:width,
    height:height,
    backgroundColor: '#ecf0f1'
  },
  button:{
    padding : 20,
    backgroundColor : '#273c75',
    justifyContent : 'center',
    marginLeft:20,
    marginRight:20},
  input:{
    height: 40, 
    width : 250,
    margin :10,
    borderColor: 'gray', borderWidth: 1
  },
  text:{
    padding:10,
    width : 200
  },
  disabledButton:{
    padding : 20,
    marginLeft:20,
    marginRight:20,
    backgroundColor : 'red'
  },
  form:{
    flex:1,
     color:'red'
  },
  padding : {
    marginBottom:20 ,
    paddingLeft:10,
    paddingRight:20
  },
  textButton : {
    color:'white'
  },
  logo: {
    alignSelf :'center',
    justifyContent : 'center',
    width: 250, 
    height: 70
  }
});
