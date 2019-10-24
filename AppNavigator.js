import React, {Component} from 'react';
import {Image } from 'react-native';
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import EditChapter from './src/screens/EditChapter'
import Profile from './src/screens/Profile'
import DetailCreateChapter from './src/screens/DetailCreateChapter'
import Home from './src/screens/Home'
import CreateChapter from './src/screens/CreateChapter'
import CreateManga from './src/screens/CreateManga'
import MangaCreation from './src/screens/MangaCreation'
import EditProfile from './src/screens/EditProfile'
import Login from './src/screens/Login';
import Chapters from './src/screens/Chapters'
import AddPage from './src/screens/AddPage'
import Details from './src/screens/Details'
import DetailsChapter from './src/screens/DetailChapter'
import Favorites from './src/screens/Favorites'
import ManageManga from './src/screens/ManageManga'
import EditManga from './src/screens/EditManga'
import AddChapter from './src/screens/AddChapter'
import ManagePage from './src/screens/ManagePage'

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
    MangaCreation : {
      screen : MangaCreation,
      navigationOptions : {
        header:null
      }
    },
    CreateManga : {
      screen : CreateManga,
      navigationOptions : {
        header:null
      }
    },
    CreateChapter : {
      screen : CreateChapter,
      navigationOptions : {
        header:null
      }
    },
    DetailCreateChapter : {
      screen : DetailCreateChapter,
      navigationOptions : {
        header:null
      }
    },
    EditChapter : {
      screen : EditChapter,
      navigationOptions : {
        header:null
      }
    },
    ManageManga : {
      screen : ManageManga,
      navigationOptions : {
        header:null
      }
    },
    Chapters : {
      screen : Chapters,
      navigationOptions : {
        header:null
      }
    },
    AddPage :{
      screen : AddPage,
      navigationOptions :{
        header : null
      }
    },
    EditManga :{
      screen : EditManga,
      navigationOptions :{
        header : null
      }
    },
    AddChapter :{
      screen : AddChapter,
      navigationOptions :{
        header : null
      }
    },
    ManagePage :{
      screen : ManagePage,
      navigationOptions :{
        header : null
      }
    },
});

export default createAppContainer(AppNavigator);
