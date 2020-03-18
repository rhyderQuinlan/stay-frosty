import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Switch,
  AsyncStorage,
  YellowBox
} from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import Toast from 'react-native-simple-toast';
import Dialog from "react-native-dialog";

import ButtonComponent from '../components/ButtonComponent';

import _ from 'lodash';
import FormInput from '../components/FormInput';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount(){
    if (!firebase.apps.length) {
      firebase.initializeApp({
          apiKey: "AIzaSyBxy1ID_WbvpcG1kHZXo-uQskAQ60Ww7B8",
          authDomain: "stay-frosty.firebaseapp.com",
          databaseURL: "https://stay-frosty.firebaseio.com",
          projectId: "stay-frosty",
          storageBucket: "stay-frosty.appspot.com",
          messagingSenderId: "930673111907",
          appId: "1:930673111907:web:7b8798a261aa560c1fd956",
          measurementId: "G-684RXPD3HR"
      });
    }
    
    const email = await this.getRememberedUser();

    this.setState({ 
      email: email || "", 
      rememberMe: email ? true : false });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User logged in: " + user)
      } else {
        console.log("User logged out: " + user)
        this.setState({rememberMe: false, email: '', password: ''})
        this.forgetUser()
      }
    });
   }

  getRememberedUser = async () => {
    try {
      const email = await AsyncStorage.getItem('EMAIL');
      const password = await AsyncStorage.getItem('PASSWORD')
      if (email !== null) {
        this.setState({ email: email, password: password })
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            Toast.show('Logging you in')
            this.props.navigation.navigate('BottomTab')        
        }).catch((error) => {
          this.setState({error:error.message})
        });
        return email;
      }
    } catch (error) {
        console.log("async getRememberedUser error: " + error)
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ButtonComponent 
              text="I want to help"
              onPress={() => this.props.navigation.navigate('NewHelper')}
              icon="login"
              type="antdesign"
            />

        <ButtonComponent 
              text="I need help"
              onPress={() => this.props.navigation.navigate('NewHelpee')}
              icon="login"
              type="antdesign"
            />

        <ButtonComponent 
              text="Sign In"
              onPress={() => this.props.navigation.navigate('LoginScreen')}
              icon="login"
              type="antdesign"
            />

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {

    }
});

export default WelcomeScreen;