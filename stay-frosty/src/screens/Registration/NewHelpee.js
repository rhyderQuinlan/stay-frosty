//TODO add user address

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
  YellowBox
} from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';

import ButtonComponent from '../../components/ButtonComponent';
import FormInput from '../../components/FormInput';
import DropdownInput from '../../components/DropdownInput';

class NewHelpee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      error: '',
      user_role: '',
      address: ''
    }
  }

  async componentDidMount(){
    
   }

  async createUser(){
    await this.setState({ user_role: 'helpee'})

    const data = await {
        email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        role: this.state.user_role,
        address: this.state.address
    }
  
    this.valid = true

    if(data.email == '' 
    || data.firstname == '' 
    || data.lastname == ''
    || data.address){
        Toast.show("All fields are required")
        this.valid = false
    }

    this.valid = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => { 
      this.setState({error: error.message})
      return false
    })

    if (this.valid) {
      await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {

      }).catch((error) => {
        this.setState({error:error.message})
      });
    }
    
    if (this.valid) {  
      const { currentUser } = firebase.auth();
      await firebase.database().ref(`users/${currentUser.uid}/`).set(data)
    }

    { this.valid ? this.props.navigation.navigate('BottomTab') : Toast.show("Created user unsuccessfully")}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>We'll help</Text>
        
        <View style={styles.inputView}>
          <TextInput  
              style={styles.inputText}
              placeholder="Firstname..." 
              placeholderTextColor="#003f5c"
              onChangeText={firstname => this.setState({firstname})}/>
        </View>
        <View style={styles.inputView}>
          <TextInput  
              style={styles.inputText}
              placeholder="Lastname..." 
              placeholderTextColor="#003f5c"
              onChangeText={lastname => this.setState({lastname})}/>
        </View>
        <View style={styles.inputView}>
          <TextInput  
              style={styles.inputText}
              placeholder="Address..." 
              placeholderTextColor="#003f5c"
              onChangeText={address => this.setState({address})}/>
        </View>
        <View style={styles.inputView}>
          <TextInput  
              style={styles.inputText}
              placeholder="Email..." 
              placeholderTextColor="#003f5c"
              onChangeText={email => this.setState({email})}/>
        </View>
        <View style={styles.inputView}>
          <TextInput  
              style={styles.inputText}
              placeholder="Password..." 
              placeholderTextColor="#003f5c"
              onChangeText={password => this.setState({password})}
              secureTextEntry={true}
              />
        </View>

            <TouchableOpacity style={styles.loginBtn} onPress={() => this.createUser()}>
              <Text style={styles.loginText}>Let's Start</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <Text style={styles.back}>Already have an account? Sign in.</Text>
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
    marginTop:40,
    marginBottom:10
  },
  loginText: {
    color: 'white',
    fontSize: 20
  }
});

export default NewHelpee;