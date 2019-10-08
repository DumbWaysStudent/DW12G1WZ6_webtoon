import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login'

const AppNavigator = createStackNavigator({
    Login : {
        screen :Login,
        navigationOptions : {
            header:null
        }
    },
    Home: { 
        screen: Home 
    },
});

export default createAppContainer(AppNavigator);
