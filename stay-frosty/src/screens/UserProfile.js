import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import firebase, { database } from 'firebase';
import { Icon } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
import { FlatList } from 'react-native-gesture-handler';

class UserProfile extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            index: this.props.navigation.getParam("id"),
            location: '',
            loading: true
        }
    }

    async componentDidMount(){
        console.log(this.state)
        try {
            const ref = firebase.database().ref(`/users/${this.state.index}/`)
            const user_info = await ref.once('value')
                .then(snapshot => {
                    return snapshot.val()}
                ).catch( error => Toast.show(error))

                Geocoder.from(user_info.location)
                    .then(json => {
                        this.setState({location: json.results[0].address_components[5].long_name})
                    }).catch(error => console.log(error))
            
            this.setState({user_info: user_info, loading: false})
        } catch (error) {
            console.warn("Error fetching data ---------------------------- ", error)
        }
    }

    render() {
        const { user_info, loading, location } = this.state
        if(!loading){
            return(
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <View>
                            <Text style={styles.logo}>{user_info.firstname}</Text>
                        </View>
                        <View style={styles.locationText}>
                            <Icon
                                name='map-marker'
                                type='font-awesome'
                                color='white'
                            />
                            <Text style={{paddingLeft: 15, fontSize: 20, color: 'white'}}>{location}</Text>
                        </View>
                        <View style={{height: 50, width: '80%', marginTop: 20}}>
                            <FlatList
                                    data={user_info.tags}
                                    renderItem={({item, index}) =>
                                            <View style={styles.tagElement}>
                                                <Text style={styles.tagText}>{item}</Text>
                                            </View>
                                    }
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal={true}
                                    
                                />
                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        <View>
                            <Text style={styles.contentHeader}>Bio</Text>
                            <Text style={styles.content}>{user_info.bio}</Text>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.loginText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <View>
                        <Text style={styles.logo}>Loading Profile...</Text>
                    </View>
                </View>
            )
        }
        
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:10,
        paddingTop: '20%'
      },
      inputText:{
        height:50,
        color:"white"
      },
      back:{
        color:"white",
        fontSize:15,
        marginTop: 20
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:20
      },
      loginText: {
        color: 'white',
        fontSize: 20
      },
      headerContainer:{
          alignItems: 'center',
          flex: 3
        },
      locationText:{
          flexDirection: 'row',
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
      },
      contentContainer: {
          flex: 5,
          backgroundColor: 'white',
          width: '100%',
          padding: '10%'
      },
      contentHeader: {
          color: '#fb5b5a',
          fontSize: 32,
          fontWeight: 'bold',
      },
      content: {
          fontSize: 20
      },
      footer: {
          flex: 1,
          backgroundColor: 'white',
          width: '100%',
          alignItems: 'center'
      }
})


export default UserProfile