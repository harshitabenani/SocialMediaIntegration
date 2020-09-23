import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import ImageScreen from './image'
import Inputs from './login'
import SignInputs from './signup'
import LoadingScreen from './loading'
import LoadingScreen1 from './loading1'
import AboutScreen from './aboutscreens/about'
import About1Screen from './aboutscreens/about1'
import About2Screen from './aboutscreens/about2'
import TwitterScreen from './twitter'
import {
 
  TransitionPresets,
} from '@react-navigation/stack';

console.disableYellowBox = true;

const RootStack=createStackNavigator(
{
    ImageScreen:ImageScreen,
    Login:Inputs,
    SignUp:{
      screen:SignInputs,
      navigationOptions:{

        header:null

      },
    },
    MainHome:{
      screen:AboutScreen,
         navigationOptions:{

        header:null

      },
   
    },
    About1:{
      screen:About1Screen,
      navigationOptions:{header:null},

    },
    About2:{
      screen:About2Screen,
      navigationOptions:{header:null},

    },
    Twitter:TwitterScreen,

  },
  {
    initialRouteName:'ImageScreen', 
    
    
  },
 

  
)




const AppContainer = createAppContainer(RootStack);
 class App extends React.Component {

  render() {
    return ( <AppContainer /> )
  }
}

export default App
