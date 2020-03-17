import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet
 } from 'react-native';
 import { Icon } from 'react-native-elements';

const ListItem = (props) => {
    const {name} = props;
    return(
        <View style={styles.maincontainer}>
            <View style={styles.uppercontainer}>
                <View style={styles.leftContainer}>
                    <View>
                        <Text>{name}</Text>
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
        paddingTop: 15
    },
    lowercontainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        borderBottomColor: '#84828C',
        borderBottomWidth: 1,
        paddingBottom: 15,
    },
    leftContainer:{

    },
    rightContainer:{

    },
    cost:{
        fontSize: 20,
        color: '#007FF3'
    },
    date: {
        fontSize: 16,
    },

    icon_text_view: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        textAlignVertical: 'bottom',
    }
});

export default ListItem;