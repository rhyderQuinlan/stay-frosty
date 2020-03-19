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
import Toast from 'react-native-simple-toast';
import humanize from 'humanize-plus';
import { Icon } from 'react-native-elements';

import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import firebase, { database } from 'firebase';
const haversine = require('haversine')

import ListItem from '../components/ListItem';

const screenWidth = Dimensions.get("window").width;



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
            loading: true,
            count: 0
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
                    var count = 0
                    snapshot.forEach((element) => {
                        if(element.val().role != this.state.user_info.role){
                            if(element.val().role == 'helper'){
                                temp_list.push({
                                    id: element.key,
                                    name: element.val().firstname,
                                })
                            } else {
                                const distance = haversine(
                                    this.state.location,
                                    element.val().location,
                                    {unit: 'km'}
                                )
                                
                                temp_list.push({
                                    id: element.key,
                                    name: element.val().firstname,
                                    tags: element.val().tags,
                                    distance: distance,
                                })
                            }
                            count++
                        }
                        this.setState({count: count})
                    })

                    return temp_list
            
                }).catch(error => Toast.show(error))
        
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
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("UserProfile", item)
            }}>
                <ListItem 
                    style={styles.item}
                    name={item.name}
                    tags={item.tags}
                    distance={item.distance.toFixed(2)}
                />
            </TouchableOpacity>
        )
    }

    render() { 
        const { loading } = this.state
        if(!loading){
            if(this.state.user_info.role == 'helper'){
                //person looking to help screen
                console.log(this.state.count)
                return(
                    <View style={styles.main}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.welcome}>Welcome {this.state.user_info.firstname}</Text>
                            <View>
                                <Text style={styles.subheading}>Here are some people that need your help</Text>
                            </View>
                        </View> 
        
                        <View style={styles.listContainer}>
                            <ScrollView>
                                <FlatList
                                    data={this.state.db}
                                    renderItem={({item, index}) => this.renderItem(item, index)}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </ScrollView>
                        </View>    
                    </View>            
            )} else {
                //person in need of help
                return (
                    <View style={styles.main}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.welcome}>Welcome {this.state.user_info.firstname}</Text>

                                <View>
                                    <Text style={styles.subheading}>Help is on the way</Text>
                                </View>
                            </View> 

                            <View style={styles.contentContainer}>
                                <View>
                                    <Icon
                                        name='group'
                                        type='font-awesome'
                                        color='#fb5b5a'
                                        size={70}
                                    />
                                </View>
                                <Text style={{fontSize: 20, paddingTop: 20}}>{this.state.count} {humanize.pluralize(this.state.count, "helper")} nearby</Text>
                                <Text style={{fontSize: 20, paddingTop: 20}}>Helpers will contact you if they are up for lending a helping hand. Please be patient.</Text>
                            </View>    
                    </View> 
                )   
            }        
        } else {
            return (
                <View style={styles.loadingscreen}>
                    <Text style={styles.loadingtext}> LOADING DATA</Text>
                </View>
            )
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
        color: 'white',
        fontSize: 20
    },
    welcome:{
        fontWeight:"bold",
        fontSize:42,
        color:"#fb5b5a",
      },
    listContainer: {
        flex: 5 
    },
    loadingscreen: {
        backgroundColor: '#003f5c',
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center'
    },
    loadingtext:{
        fontWeight:"bold",
        fontSize:42,
        color:"#fb5b5a",
        textAlign: 'center'
    },
    contentContainer: {
        alignItems: 'center',
        flex: 5,
        padding: '10%',
        justifyContent: 'center'
    }
});

export default HomeScreen;