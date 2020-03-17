import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Switch,
  AsyncStorage,
  YellowBox
} from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';

import ButtonComponent from '../../components/ButtonComponent';
import FormInput from '../../components/FormInput';
import DropdownInput from '../../components/DropdownInput';

class UserRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user_role: null
    }
  }

  async componentDidMount(){
    
   }

  
   setRole(role){
        this.setState({ user_role: role})
   }

  render() {
    return (
      <View style={styles.container}>
        <ButtonComponent 
                text="I Need Help"
                onPress={() => this.setRole('helpee')}
                icon="arrowright"
                type="antdesign"
            />
        <ButtonComponent 
            text="I Want Help"
            onPress={() => this.setRole('helper')}
            icon="arrowright"
            type="antdesign"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomColor: '#FFD559',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    width:'80%',
    height:55,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
});

export default UserRole;