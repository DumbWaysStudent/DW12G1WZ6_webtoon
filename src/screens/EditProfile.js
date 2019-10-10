import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,Dimensions } from 'react-native';
import { Header, Body, Right, Icon,Form, Item, Input} from 'native-base'
const fitScreen = Dimensions.get('window').width * 0.75;
import ImagePicker from 'react-native-image-picker';


export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        profilePhoto:{
            url : require('../assets/defaultUser.png')
        }
    };
  }
  
  handleCamera=()=>{
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      
      /**
       * The first arg is the options object for customization (it can also be null or omitted for default options),
       * The second arg is the callback which sends object: response (more info in the API Reference)
       */
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            photoProfile: source.uri,
          });
        }
      });
  }

  render() {
    return (
      <View>
          <Header style ={{backgroundColor:'light-gray'}}>
                <Body>
                    <Text>Edit Profile</Text>
                </Body>
                <Right>             
                    <Icon name='checkmark' />
                </Right>
          </Header>
          <View style={{borderRadius: 50, alignItems: 'center'}}>
          <Image
            style={styles.photoProfile}
            source={this.state.profilePhoto}
          />
          <Icon name="camera" onPress={this.handleCamera}/>
          <View style={{marginTop : 30}}>
          <Form
          style={styles.button}
          >
          <Item>
            <Input
              value='Rizky'/>
          </Item>
        </Form>
          </View>

          </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  photoProfile:{
    borderRadius: 75,
    height: 150,
    width : 150,
    margin: 20
  },
  button:{
      borderColor : 'grey',
      borderWidth : 1,
      width: fitScreen,
    }
})
