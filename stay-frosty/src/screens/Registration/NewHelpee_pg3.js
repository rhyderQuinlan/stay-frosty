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

class NewHelpee_pg3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        bio: ''
    }
  }

  async addBio(){
      console.log('add bio')
      const { currentUser } = firebase.auth()
      await firebase.database().ref(`users/${currentUser.uid}/bio`).set(this.state.bio)
      this.props.navigation.navigate('BottomTab') 
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Add a bio to help people understand</Text>
        
        <View style={styles.inputView}>
          <TextInput  
                style={styles.inputText}
                placeholder="Type here..." 
                placeholderTextColor="#003f5c"
                onChangeText={bio => this.setState({bio})}
                multiline={true}
              />
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.paragraphtext}>Let people know exactly what you need help with eg. Walking your dog.</Text>
          <Text style={styles.paragraphtext}>Add a way for people to get in contact, but remember this will be public.</Text>
        </View>

            <TouchableOpacity style={styles.loginBtn} onPress={() => this.addBio()}>
              <Text style={styles.loginText}>Let's start</Text>
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
    height:'40%',
    marginBottom:20,
    padding:20
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputText:{
    color:"white",
    fontSize: 18
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
  },
  paragraph: {
    width: '80%',
  },
  paragraphtext: {
    color: 'white',
    fontSize: 18
  }
});

export default NewHelpee_pg3;