import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    AsyncStorage,
} from 'react-native';

class UserProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            index: this.props.navigation.getParam("id")
        }
    }

    render() {
        return(
            <View>
                <Text>{this.state.index}</Text>
            </View>
        )
    }

    
}


export default UserProfile