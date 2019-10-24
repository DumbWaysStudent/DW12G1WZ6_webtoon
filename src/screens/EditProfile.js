import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,Dimensions } from 'react-native';
import { Header, Body, Right, Icon,Form, Item, Input, Left} from 'native-base'
const fitScreen = Dimensions.get('window').width * 0.75;
import ImagePicker from 'react-native-image-picker';


export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        profilePhoto:{
            uri : 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
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
          this.setState({
            profilePhoto: source,
          });
        }
      });
  }

  goToPrevScreen=()=> this.props.navigation.goBack()

  render() {
    return (
      <View>
          <Header style ={{backgroundColor:'light-gray'}}>
                <Left>
                  <Icon name ='arrow-back' onPress={this.goToPrevScreen}/>
                </Left>
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
            source={{uri : this.state.profilePhoto.uri}}
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
