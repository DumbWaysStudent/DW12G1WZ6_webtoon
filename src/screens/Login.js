import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import { 
    Icon,
    Button, 
    Form, 
    Item, 
    Input, } from 'native-base';

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
  authentication=()=>{
    const inputUsername = this.state.inputUsername
    const inputPassword = this.state.inputPassword
    inputUsername==='rizky@gmail.com'&&inputPassword==='rizky'?
    this.props.navigation.navigate('Home')
    :
    alert('Gagal Login')
  }

  render() {
    return (
   <View style={styles.form}>
       <Image style={styles.logo}
       source = {require('./../assets/logo.png')}/>
        <Form style={styles.padding} >
            <Item>
                <Input
                    autoCapitalize ='none'
                    placeholder ='Masukan Email'
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
    );
    }
}
const styles = StyleSheet.create({
  button:{
    padding : 20,
    backgroundColor : 'orange',
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
      justifyContent:'center',
      flex : 1,
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
    width: 150, 
    height: 200
  }
});
