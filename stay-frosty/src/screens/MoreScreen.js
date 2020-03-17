//TODO make claim

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    AsyncStorage,
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
                    this.props.navigation.navigate('LoginScreen')}
                },
            ],
          );
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Image 
                        source={require('../../assets/settings.png')}
                        style={styles.icon}
                    />
                </View>
                <View style={styles.buttonContainer} >
                    <ButtonComponent 
                        text="Vehicles"
                        onPress={() => this.props.navigation.navigate('ViewVehicles')}
                        icon="car"
                        type="antdesign"
                    />

                    <ButtonComponent 
                        text="Profile Details"
                        onPress={() => this.props.navigation.navigate('EditUserDetails')}
                        icon="user"
                        type="antdesign"
                    />
                    <ButtonComponent 
                        text="Make Claim"
                        onPress={() => alert("Make Claim Pressed")}
                        icon="copy1"
                        type="antdesign"
                    />

                    <ButtonComponent 
                        text='Logout'
                        icon='logout'
                        type='antdesign'
                        onPress={() => this.logout()}
                    />
                </View> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        flexDirection: 'column'
    },
    icon:{
        width: 100,
        height: 100
    },
    iconContainer:{
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonContainer:{
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center'
    }
});

export default MoreScreen;