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
import firebase, { database } from 'firebase';
const haversine = require('haversine')

import ListItem from '../components/ListItem';

const screenWidth = Dimensions.get("window").width;

Geocoder.init("AIzaSyB2HNV3JKzVtnQxwHabSekf2buAnC7-qRo")

var user_list = []

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_role: '',
            db: {},
            user_info: {},
            location: null,
            user_name: '',
            loading: true
        };
    }

    async componentDidMount(){
        //get user location
        this.getLocation()

        const { currentUser } = firebase.auth()
        try {
            const ref = firebase.database().ref(`/users/${currentUser.uid}`)
            const user_info = await ref.once('value')
                .then(snapshot => {
                    return snapshot.val()}
                ) .catch( error => Toast.show(error))
            
            this.setState({user_info: user_info})
        } catch (error) {
            console.warn("Error fetching data ---------------------------- ", error)
        }

        try {
            const db_list = await firebase.database().ref(`/users/`).once('value')
                .then(snapshot => {
                    var temp_list = []
                    var distance = 0
                    snapshot.forEach((element) => {
                        if(element.val().role != this.state.user_info.role){
                            const distance = Geocoder.from(element.val().address)
                                .then(json => {
                                    return haversine(
                                        this.state.location,
                                        {
                                            longitude: json.results.geometry.location.lng,
                                            latitude: json.results.geometry.location.lat,
                                        },
                                        {unit: 'km'}
                                    )
                                }).catch(error => {
                                    console.warn('Unable to geocode -------------------------------- ', error)
                                })
                            temp_list.push({
                                name: element.val().firstname,
                                tags: element.val().tags,
                                distance: distance
                            })
                        }
                    })

                    return temp_list
            
                }).catch(error => Toast.show(error))

                console.log(db_list)
        
                this.setState({ db: db_list, loading: false})
        } catch (error) {
            console.warn("Error fetching data ---------------------------- ", error)
        }
        
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

    renderItem(item, index){
        return (
            <ListItem 
                style={styles.item}
                name={item.name}
                tags={item.tags}
            />
        )
    }

    render() { 
        const { loading } = this.state
        if(!loading){
            console.log(this.state.db)
            return(
                <View style={styles.main}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.welcome}>Welcome {this.state.user_info.firstname}</Text>
                        {
                            this.state.user_info.role == 'helper' ? (
                                    <View>
                                        <Text style={styles.subheading}>Here are some people that need your help</Text>
                                    </View>
                                ) : (
                                    <View>
                                        <Text style={styles.subheading}>Help is on the way</Text>
                                    </View>
                                    
                                    )
                        }
                    </View> 
    
                    <View style={styles.listContainer}>
                        <ScrollView>
                        <FlatList
                            data={this.state.db}
                            renderItem={({item, index}) => this.renderItem(item, index)}
                                //TODO clickable list item -> user profile
                            keyExtractor={(item, index) => index.toString()}
                        />
                        </ScrollView>
                    </View>    
                </View>
            )          
        } else {
            return <View>
                <Text> LOADING DATA</Text>
            </View>
        }
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    headerContainer:{
        flex: 2,
        backgroundColor: '#003f5c',
        justifyContent: 'flex-end',
        paddingBottom: 30
    },
    subheading: {
        color: 'white'
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