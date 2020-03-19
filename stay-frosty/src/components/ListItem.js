import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet
 } from 'react-native';
 import { Icon } from 'react-native-elements';
import { TextInput, createNativeWrapper, FlatList } from 'react-native-gesture-handler';

const ListItem = (props) => {
    const {name, distance, tags} = props;
    var tags_array = []

    for(index = 0; index < tags.length; index++){
        if(index < 3){
            tags_array.push(tags[index])
        } else {
            index = tags.length
        }
    }

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
                    <FlatList
                        data={tags_array}
                        renderItem={({item, index}) =>
                                <View style={styles.tagElement}>
                                    <Text style={styles.tagText}>{item}</Text>
                                </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        style={{paddingLeft: 40}}
                    />

                    {
                        tags.length > 3 ? (
                            <View style={{paddingRight: 30}}>
                                <Text>+ {tags.length - 3} more</Text>
                            </View>
                        ) : null
                    }
            </View>
        </View>
    )
}

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