import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    AsyncStorage,
    TouchableOpacity,
    Alert
} from 'react-native';
import firebase from 'firebase';

import ButtonComponent from '../components/ButtonComponent';

class MoreScreen extends Component {
    logout(){
        Alert.alert(
            'Logout',
            'Are you sure you would like to logout?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Logout', onPress: () => {
                    firebase.auth().signOut()
                    this.forgetUser()
                    this.props.navigation.navigate('WelcomeScreen')}
                },
            ],
          );
    }

    forgetUser = async () => {
        try {
          await AsyncStorage.removeItem('EMAIL');
          await AsyncStorage.removeItem('PASSWORD')
        } catch (error) {
         console.log("async forgetUser error: " + error)
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.navigate('EditUserDetails')}>
                    <Text style={styles.loginText}>Profile Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={() => this.logout()}>
                    <Text style={styles.loginText}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:20
      },
      loginText: {
        color: 'white',
        fontSize: 20
      },
});

export default MoreScreen;