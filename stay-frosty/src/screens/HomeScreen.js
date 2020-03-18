//TODO get user location
//TODO sort database by distance

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Platform,
    PermissionsAndroid
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Toast from 'react-native-simple-toast';


import { ScrollView, FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';
const haversine = require('haversine')

import ListItem from '../components/ListItem';

const screenWidth = Dimensions.get("window").width;

Geocoder.init("AIzaSyB2HNV3JKzVtnQxwHabSekf2buAnC7-qRo")

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_role: '',
            user_list: [],
            location: null,
        };
    }

    

    async componentDidMount(){
        //get user location
        this.getLocation()

        const { currentUser } = firebase.auth()
        //get user role
        await firebase.database().ref(`/users/${currentUser.uid}/`).on('value', snapshot => {
            this.setState({ user_role: snapshot.val().role, user_name: snapshot.val().firstname})
        })

        //get user_list
        firebase.database().ref(`/users/`).on('value', snapshot => {
            var user_list = []
            if(this.state.user_role == 'helper'){
                Toast.show('You are a helper')
                snapshot.forEach(async (childSub) => {
                    if(childSub.val().role == 'helpee'){
                        Geocoder.from(childSub.val().address)
                            .then((json) => {
                                const position = {
                                    latitude: json.results[0].geometry.location.lat,
                                    longitude: json.results[0].geometry.location.lng
                                }

                                distance = (haversine({latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude}, position, {unit: 'km'}) || 0).toFixed(1)
                            })
                            .catch(error => console.log(error))

                        const data = {
                            id: childSub.key,
                            name: childSub.val().firstname,
                            distance: distance
                        }

                        user_list.push(data)
                    }
                })
            } else {
                snapshot.forEach((childSub) => {
                    if(childSub.val().role == 'helper'){
                        this.id = childSub.key
                        this.name = childSub.val().firstname
                        const data = {
                            id: this.id,
                            fullname: this.fullname,
                        }

                        user_list.push(data)
                    }
                })
            }

            this.setState({user_list: user_list.reverse()})
        })
        
        console.log(this.state)
    }

    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();
    
        if (!hasLocationPermission) return;
    
        this.setState({ loading: true }, () => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ 
                        location: position,
                    });
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

    render() { 
        return(
            <View style={styles.main}>
                <View style={styles.headerContainer}>
                    <Text style={styles.welcome}>Welcome {this.state.user_name}</Text>
                    {
                        this.state.user_role == 'helper' ? (
                                <View>
                                    <Text>You are helping the world</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text>Help is on the way</Text>
                                </View>
                                
                                )
                    }
                </View> 

                <View style={styles.listContainer}>
                        <ScrollView>
                        <FlatList
                            data={this.state.user_list}
                            renderItem={({item, index}) =>
                                //TODO clickable list item -> user profile
                                    <ListItem 
                                        style={styles.item}
                                        name={item.name}
                                        distance={item.distance}
                                    />
                                }
                            keyExtractor={(item, index) => index.toString()}
                        />
                        </ScrollView>
                        
                    </View>    
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        marginTop: '10%',
        justifyContent: 'space-between'
    },
    headerContainer:{
        flex: 2,
        borderBottomColor: '#fb5b5a',
        borderBottomWidth: 1,
    },
    welcome:{
        fontWeight:"bold",
        fontSize:42,
        color:"#fb5b5a",
      },

    listContainer: {
        flex: 5
    },
});

export default HomeScreen;