//TODO get user location
//TODO sort database by distance

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';

import Journey from '../components/Journey'
import { ScrollView, FlatList } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get("window").width;

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    async componentDidMount(){

    }

    render() { 
        return(
            <View style={styles.main}>
                <View style={styles.contentContainer}>
                    <Text>Profile Screen</Text>
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
    }
});

export default ProfileScreen;