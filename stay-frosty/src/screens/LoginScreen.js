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

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      error: '',
      resetPasswordDialog: false
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
  

  rememberUser = async () => {
    try {
      await AsyncStorage.setItem('EMAIL', this.state.email);
      await AsyncStorage.setItem('PASSWORD', this.state.password);
    } catch (error) {
      console.log("async rememberMe error: " + error)
    }
  };
    
  getRememberedUser = async () => {
    try {
      const email = await AsyncStorage.getItem('EMAIL');
      const password = await AsyncStorage.getItem('PASSWORD')
      if (email !== null) {
        this.setState({ email: email, password: password })
        this.signinUser();
        return email;
      }
    } catch (error) {
        console.log("async getRememberedUser error: " + error)
    }
  };

  resetPassword(){
    firebase.auth().sendPasswordResetEmail(this.passwordChangeEmail)
      .then(() => alert("Password reset email sent"))
      .catch((error) => this.setState({error:error.message}))
  }
    
  forgetUser = async () => {
      try {
        await AsyncStorage.removeItem('EMAIL');
        await AsyncStorage.removeItem('PASSWORD')
      } catch (error) {
       console.log("async forgetUser error: " + error)
      }
  };

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId)
  };

  signinUser(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        this.props.navigation.navigate('BottomTab')        
    }).catch((error) => {
      this.setState({error:error.message})
    });
  }

  toggleRememberMe = value => {
    this.setState({ rememberMe: value })
      if (value === true) {
        this.rememberUser();
    } else {
      this.forgetUser();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
          <Image 
            source={require('../../assets/logo-yellow-blue.png')}
            style={styles.image}
          />
        </View>
        
        <View style={styles.inputcontainer}>
          <View>
            <FormInput
                icon="email-outline"
                type="material-community"
                placeholder="Email"
                keyboardType='email-address'
                onChangeText={(email) => this.setState({email})}
                ref={(input) => { this.emailInput = input }}
                secureTextEntry={false}
              />

            <FormInput
                icon="account-key-outline"
                type="material-community"
                placeholder="Password"
                keyboardType="default"
                onChangeText={(password) => this.setState({password})}
                ref={(input) => { this.passwordInput = input }}
                secureTextEntry={true}
              />
          </View>

          <View style={styles.errorcontainer}>
            <Text style={styles.error}>{this.state.error}</Text>
          </View>

          <View style={styles.rememberMecontainer}>
              <View>
                <Text>Remember Me</Text>
              </View>
              
              <View>
                <Switch
                  value={this.state.rememberMe}
                  onValueChange={(value) => this.toggleRememberMe(value)}
                  trackColor='#007FF3'
                  thumbColor='#007FF3'
                />
              </View>
          </View>

          <View>
              <Dialog.Container visible={this.state.resetPasswordDialog}>
                  <Dialog.Title>Reset password</Dialog.Title>
                  <Dialog.Description>
                      Enter account email address. Then check your emails for reset link.
                  </Dialog.Description>
                  <Dialog.Input 
                      onChangeText={(passwordChangeEmail) => this.passwordChangeEmail = passwordChangeEmail}
                      label="Email Address"
                      placeholder="Enter email"
                      />
                  <Dialog.Button label="Cancel" onPress={() => this.setState({ resetPasswordDialog: false})}/>
                  <Dialog.Button label="Confirm" onPress={() => {
                      this.setState({resetPasswordDialog: false})
                      this.resetPassword()
                      }}/>
              </Dialog.Container>
          </View>

          <View style={styles.linkcontainer}>
            <ButtonComponent 
              text="Login"
              onPress={() => this.signinUser()}
              icon="login"
              type="antdesign"
            />

            <TouchableHighlight style={styles.link} onPress={() => this.setState({resetPasswordDialog: true})}>
                <Text>Forgot your password?</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.link} onPress={() => this.props.navigation.navigate('UserRegistration')}>
                <Text>Register</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
  },
  imagecontainer: {
    flex: 1, 
    justifyContent: 'flex-end'
  },
  image:{
    width: 100,
    height: 100,
  },
  inputcontainer: {
    flex: 3, 
    justifyContent: 'center',
    width: '80%'
  },
  errorcontainer: {

  },
  error: {
    textAlign: 'center', 
    color: 'red',
    padding: 10
  },
  rememberMecontainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent:  'space-between',
    borderBottomColor: 'transparent',
    paddingBottom: 20
  },
  linkcontainer: {

  },
  link: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom:10,
    borderRadius:5,
    paddingTop: 10
  }
});

export default LoginScreen;