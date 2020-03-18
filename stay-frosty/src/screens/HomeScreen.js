//TODO get user location
//TODO sort database by distance

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    AsyncStorage,
    Platform,
    PermissionsAndroid
} from 'react-native';

import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import firebase from 'firebase';

import ListItem from '../components/ListItem';

const screenWidth = Dimensions.get("window").width;

// Geocoder.init("AIzaSyB2HNV3JKzVtnQxwHabSekf2buAnC7-qRo")

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_role: '',
            user_list: []
        };
    }

    async componentDidMount(){
        //get user location
        await this.getLocation()

        const { currentUser } = firebase.auth()
        //get user role
        await firebase.database().ref(`/users/${currentUser.uid}/`).on('value', snapshot => {
            this.setState({ user_role: snapshot.val().role })
        })

        //get user_list
        await firebase.database().ref(`/users/`).on('value', snapshot => {
            var user_list = []
            if(this.state.user_role == 'helper'){
                snapshot.forEach((childSub) => {
                    if(childSub.val().role == 'helpee'){
                        this.id = childSub.key
                        this.fullname = childSub.val().firstname + " " + childSub.val().lastname
                        this.distance =  this.measureDistance(childSub.val().address)
                        
                        const data = {
                            id: this.id,
                            fullname: this.fullname,
                            distance: this.distance
                        }

                        user_list.push(data)
                    }
                })
            } else {
                snapshot.forEach((childSub) => {
                    if(childSub.val().role == 'helper'){
                        this.id = childSub.key
                        this.fullname = childSub.val().firstname + " " + childSub.val().lastname
                        this.distance =  this.measureDistance(childSub.val().address)
                  
                        const data = {
                            id: this.id,
                            fullname: this.fullname,
                            distance: this.distance
                        }

                        user_list.push(data)
                    }
                })
            }

            this.setState({user_list: user_list.reverse()})
        })
    }

    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();
    
        if (!hasLocationPermission) return;
    
        this.setState({ loading: true }, () => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({ 
                        location: position, 
                        loading: false,
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

    measureDistance = async (address) => {
        
    }

    render() { 
        return(
            <View style={styles.main}>
                <View style={styles.contentContainer}>
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

                    <View>
                        <ScrollView>
                            <FlatList
                                data={this.state.user_list}
                                renderItem={({item, index}) =>
                                    //TODO clickable list item -> user profile
                                    
                                    <TouchableHighlight onPress={() => {
                                        console.log(item.id)
                                        this.props.navigation.navigate("UserProfile", item)
                                    }}>
                                    <ListItem 
                                        style={styles.item}
                                        name={item.firstname + " " + item.lastname}
                                    />
                                    </TouchableHighlight>
                                }
                                keyExtractor={(item, index) =>{
                                    index.toString()
                                    // console.log(index.toString())
                                } }
                                
                            />
                        </ScrollView>
                    </View>
                </View>     
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 5,
        flexDirection: 'column'
    },
    contentContainer:{
        flex: 2,
        flexDirection: 'column'
    },
});

export default HomeScreen;