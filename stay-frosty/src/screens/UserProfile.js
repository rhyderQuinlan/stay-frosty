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
            index: this.props.navigation.getParam("id"),
            fullname: this.props.navigation.getParam("fullname"),
            distance: this.props.navigation.getParam("distance")
        }
    }

    render() {
        return(
            <View>
                <Text>{this.state.index}</Text>
                <Text>{this.state.fullname}</Text>
                <Text>{this.state.distance}</Text>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    main: {
       
    }
  
});

export default UserProfile