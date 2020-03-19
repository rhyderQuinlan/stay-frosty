//TODO add user address

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';

import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyB2HNV3JKzVtnQxwHabSekf2buAnC7-qRo")

class NewHelpee_pg1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      error: '',
      user_role: '',
      location: {}
    }
  }

  async componentDidMount(){
    this.getLocation()
  }

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({ 
                    location: {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude
                    },
                });
                console.log("getPosition -> " + this.state.location.longitude)
        },
        (error) => {
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
      );
    });
}

hasLocationPermission = async () => {
  if (Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)) {
  return true;
  }

  const hasPermission = await PermissionsAndroid.check(
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (hasPermission) return true;

  const status = await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

  if (status === PermissionsAndroid.RESULTS.DENIED) {
      Toast.show('Location permission denied by user.', Toast.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Toast.show('Location permission revoked by user.', Toast.LONG);
  }

  return false;
}

  async createUser(){
    await this.setState({ user_role: 'helpee'})

    console.log("State-location: " + this.state.location)

    const data = await {
        email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        role: this.state.user_role,
        location: this.state.location
    }
  
    this.valid = true

    if(data.email == '' 
    || data.firstname == '' 
    || data.lastname == ''){
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

    { this.valid ? this.props.navigation.navigate('NewHelpee_pg2') : null}
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

        <View style={{width: 250, alignSelf: 'center'}}>
            <Text style={{textAlign: 'center', color: 'red'}}>{this.state.error}</Text>
        </View>

            <TouchableOpacity style={styles.loginBtn} onPress={() => this.createUser()}>
              <Text style={styles.loginText}>Next</Text>
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
    marginBottom:40,
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

export default NewHelpee_pg1;