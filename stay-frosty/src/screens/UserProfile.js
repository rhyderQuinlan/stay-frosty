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
        
        try{
            index2 = AsyncStorage.getItem('INDEX')
        }catch (error) {
            console.log("async rememberMe error: " + error)
        }
        
        this.state = {
            index: this.props.navigation.getParam('userIndex', 'NO-INDEX'),
            index3: "test" 
        }
    }

    render() {
        return(
            <View>
                <Text>{this.index}  {this.index2} {this.state.index3}</Text>
            </View>
        )
    }

    
}


export default UserProfile