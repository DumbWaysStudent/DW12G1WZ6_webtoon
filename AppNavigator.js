import React, {Component} from 'react';
import {Image } from 'react-native';
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Profile from './src/screens/Profile'
import Home from './src/screens/Home';
import EditProfile from './src/screens/EditProfile'
import Login from './src/screens/Login';
import Details from './src/screens/Details'
import DetailsChapter from './src/screens/DetailChapter'
import Favorites from './src/screens/Favorites'
import {createBottomTabNavigator} from 'react-navigation-tabs';

const MainApp = createBottomTabNavigator(
    {
      ForYou : {screen:Home},
      Favorites :{screen:Favorites} ,
      Profile: {screen:Profile},
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
           if (routeName === 'Profile') {
            return (
              <Image
                source={ require('./src/assets/icon/user.png') }
                style={{ width: 20, height: 20, }} /> 
            );
          }
        else if(routeName==='Favorites') {
            return (
              <Image
                source={ require('./src/assets/icon/favorites.png') }
                style={{ width: 20, height: 20, }} /> 
            );
        }
        else if(routeName==='ForYou') {
            return (
              <Image
                source={ require('./src/assets/icon/menu.png') }
                style={{ width: 20, height: 20, }} /> 
            );
          }
        },
      }),
      tabBarOptions: {
        activeTintColor: '#FF6F00',
        inactiveTintColor: '#263238',
      },
    }
  );
const AppNavigator = createStackNavigator({
   
    Login : {
      screen :Login,
      navigationOptions : {
      header:null
      }
    },
    Home: { 
      screen: MainApp,
      navigationOptions : {
          header:null
      }
    },
    Details: { 
      screen: Details,
      navigationOptions : {
        header:null
    }
    },
    DetailsChapter : {
      screen : DetailsChapter,
      navigationOptions : {
        header:null
      }
    },
    Profile : {
      screen : Profile,
      navigationOptions : {
        header:null
      }
    },
    EditProfile : {
      screen : EditProfile,
      navigationOptions : {
        header:null
      }
    },
   
});

export default createAppContainer(AppNavigator);
