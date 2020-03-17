import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  YellowBox
} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import UserRegistration from './src/screens/Registration/UserRegistration';
import EditUserDetails from './src/screens/User/EditUserDetails';
import MoreScreen from './src/screens/MoreScreen';
import UserProfile from './src/screens/UserProfile';

console.disableYellowBox = true;

const BottomTab = createMaterialBottomTabNavigator(
  {
    Home: { 
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <View>
              <Icon
                name='home'
                color={tintColor}
              />
            </View>
          )
        }
      }
     },
    More: { 
      screen: MoreScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <View>
              <Icon
                name='more-horizontal'
                type='feather'
                color={tintColor}
              />
            </View>
          )
        }
      }
     },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#FFD559',
    inactiveColor: '#EFF1F3',
    barStyle: { 
      backgroundColor: '#007FF3',
      elevation: 10
     },
  }
);

const MainNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login Screen',
        headerShown: false
      }
    },
    UserRegistration:{
      screen: UserRegistration,
      navigationOptions: {
        title: 'User Registration',
        headerShown: false
      }
    },
    EditUserDetails: {
      screen: EditUserDetails,
      navigationOptions: {
        title: 'View & Edit Details',
        headerTitleStyle: {
          alignSelf: 'center'
        }
      }
    },
    UserProfile: {
      screen: UserProfile,
      
    },
    BottomTab: {
      screen: BottomTab,
      // navigationOptions: {
      //   headerShown: false
      // }
    }
  },
  {
    initialRouteName: 'LoginScreen',
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#007FF3',
  },
});

const App = createAppContainer(MainNavigator);

export default App;