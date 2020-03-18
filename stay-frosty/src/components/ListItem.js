import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet
 } from 'react-native';
 import { Icon } from 'react-native-elements';

const ListItem = (props) => {
    const {name, distance} = props;
    return(
        <View style={styles.maincontainer}>
            <View style={styles.uppercontainer}>
                <View style={styles.leftContainer}>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text>{distance} km </Text>
                    </View>                
                </View>
                <View style={styles.rightContainer}>
                    <View>
                        <Icon
                            name="ios-arrow-forward"
                            type="ionicon"
                            color="#fb5b5a"
                        />
                    </View>
                </View>
            </View>
            <View style={styles.lowercontainer}>
                
            </View>
        </View>
    )
};

const styles=StyleSheet.create({
    maincontainer: {
        flexDirection: 'column'
    },
    uppercontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 15,
        paddingTop: 30
    },
    lowercontainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        borderBottomColor: '#fb5b5a',
        borderBottomWidth: 1,
        paddingBottom: 15,
    },
    leftContainer:{

    },
    rightContainer:{
    },
    date: {
        fontSize: 16,
    },
    name:{
        fontSize: 20
    }
});

export default ListItem;