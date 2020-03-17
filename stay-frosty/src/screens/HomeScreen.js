//TODO get user location
//TODO sort database by distance

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    AsyncStorage,
} from 'react-native';

import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import firebase from 'firebase';

import ListItem from '../components/ListItem';

const screenWidth = Dimensions.get("window").width;

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_role: '',
            user_list: [],
            indexInfo: ""
        };
    }

    async componentDidMount(){
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
                        user_list.push(childSub.val())
                    }
                })
            } else {
                snapshot.forEach((childSub) => {
                    if(childSub.val().role == 'helper'){
                        user_list.push(childSub.val())
                    }
                })
            }

            this.setState({user_list: user_list.reverse()})
        })
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
                                        this.setState({indexInfo: index})
                                        console.log(index.toString())
                                        try{
                                            AsyncStorage.setItem('INDEX', this.state.indexInfo)
                                        } catch (error) {
                                            console.log("async rememberMe error: " + error)
                                        }
                                        this.props.navigation.navigate("UserProfile", {userIndex: this.state.indexInfo})
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