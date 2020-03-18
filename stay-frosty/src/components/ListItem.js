import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet
 } from 'react-native';
 import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

const ListItem = (props) => {
    const {name, distance, tags} = props;
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
                <View style={styles.tagElement}>
                    <Text style={styles.tagText}>{tags[0]}</Text>
                </View>
                
                <View style={styles.tagElement}>
                    <Text style={styles.tagText}>{tags[1]}</Text>
                </View>

                <View style={styles.tagElement}>
                    <Text style={styles.tagText}>{tags[2]}</Text>
                </View>
                {
                    tags.length > 3 ? (
                        <Text>+ {tags.length - 3} more</Text>
                    ) : null
                }
            </View>
        </View>
    )
};

// {/* (tags.length > 3) ? (<Text>+ {tags.length - 3}</Text> ) : null */}

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
        paddingTop: 30,
    },
    lowercontainer: {
        flexDirection: 'row',
        borderBottomColor: '#fb5b5a',
        borderBottomWidth: 1,
        paddingBottom: 15,
        justifyContent: 'center'
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
    },
    tagElement:{
        borderRadius:25,
        borderColor: '#fb5b5a',
        borderWidth: 1,
        backgroundColor: '#fb5b5a',
        marginBottom:20,
        justifyContent:"center",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginRight: 10

      },

      tagText:{
          color: 'white'
      }
});

export default ListItem;