//TODO analytics lines chart

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

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    async componentDidMount(){

    }

    renderJourney(distance, cost){
        return <Journey distance={distance} cost={cost} />
    }

    humanizedMonth(month){
        switch (month) {
            case 0:
                month = "Jan"
                break;
            case 1:
                month = "Feb"
                break;
            case 2:
                month = "Mar"
                break;
            case 3:
                month = "Apr"
                break;
            case 4:
                month = "May"
                break;
            case 5:
                month = "Jun"
                break;
            case 6:
                month = "Jul"
                break;
            case 7:
                month = "Aug"
                break;
            case 8:
                month = "Sep"
                break;
            case 9:
                month = "Oct"
                break;
            case 10:
                month = "Nov"
                break;
            case 11:
                month = "Dec"
                break;        
            default:
                break;
        }
        return month
    }

    render() { 
        return(
            <View style={styles.main}>
                <View style={styles.contentContainer}>
                    <Text>Homescreen</Text>
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

export default HomeScreen;