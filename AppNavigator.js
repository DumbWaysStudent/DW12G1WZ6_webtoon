import React, {Component} from 'react';
import {Image } from 'react-native';
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Details from './src/screens/Details'
import Favorites from './src/screens/Favorites'
import {createBottomTabNavigator} from 'react-navigation-tabs';

const MainApp = createBottomTabNavigator(
    {
      Profile: {screen:Home} ,
      Favorites :{screen:Favorites} ,
      ForYou : {screen:Home}
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
   
});

export default createAppContainer(AppNavigator);
