//TODO add user address

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
  AsyncStorage,
  YellowBox
} from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';

import TagsView from '../../components/TagsView'

class NewHelpee_pg2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        error: '',
        user_role: '',
        address: '',
        selected: [],
        tags: ['Food', 'Clothes', 'Support', 'Company', 'Pets', 'Shopping', 'Self-Isolated', 'Quarantined', 'Sick', 'Elderly', 'Money', 'Transport', 'Advice', 'Disability']
    }
  }

  async componentDidMount(){
        this.data = {
            dog_walk: "Walk Dogs",
            shopping: "Shopping"
        }
   }

  addTags(){
        if(this.state.selected.length > 0){
            const { currentUser } = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/tags`).set(this.state.selected).then(()=>this.props.navigation.navigate('NewHelpee_pg3'))
            .catch(error => this.setState({error}))
        } else {``
            this.setState({error: "Please select at least one"})
        }
  }

  render() {
    const { tags, selected } = this.state
    
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Give your profile some tags</Text>
        
        <TagsView
            all={tags}
            selected={selected}
            isExclusive={false}
        />

        <View style={{width: 250, alignSelf: 'center'}}>
            <Text style={{textAlign: 'center', color: 'red'}}>{this.state.error}</Text>
        </View>
        

        <TouchableOpacity style={styles.loginBtn} onPress={() => this.addTags()}>
            <Text style={styles.loginText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20%'
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
    fontSize:15
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText: {
    color: 'white',
    fontSize: 20
  }
});

export default NewHelpee_pg2;