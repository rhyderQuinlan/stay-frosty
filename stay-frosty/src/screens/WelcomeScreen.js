import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
  AsyncStorage,
  YellowBox,
  ImageBackground
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
    
    await this.getRememberedUser();
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
      } else {
        console.info('User not remembered')
      }
    } catch (error) {
        console.log("async getRememberedUser error: " + error)
    }
}

  render() {
    return (
      <View style={styles.container}>
            <Text style={styles.logo}>Helping Hand</Text>

            <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.navigate('NewHelper')}>
              <Text style={styles.loginText}>I want to help</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.navigate('NewHelpee_pg1')}>
              <Text style={styles.loginText}>I need help</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputText:{
    height:50,
    color:"white"
  },
  back:{
    color:"white",
    fontSize:15
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:30
  },
  loginText: {
    color: 'white',
    fontSize: 20,
  }
});

export default WelcomeScreen;