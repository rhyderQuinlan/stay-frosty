import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import firebase, { database } from 'firebase';
class UserProfile extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            index: this.props.navigation.getParam("id"),
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
                ) .catch( error => Toast.show(error))
            
            this.setState({user_info: user_info, loading: false})
        } catch (error) {
            console.warn("Error fetching data ---------------------------- ", error)
        }
    }

    render() {
        const { user_info, loading } = this.state
        if(!loading){
            return(
                <View style={styles.container}>
                    <Text style={styles.logo}>{user_info.firstname}</Text>
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <Text style={styles.logo}>Loading Profile...</Text>
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
        marginBottom:40
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
})


export default UserProfile