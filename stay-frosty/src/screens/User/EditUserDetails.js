import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import firebase from 'firebase';
import Toast from 'react-native-simple-toast';
import Dialog from "react-native-dialog";

class EditUserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            role: '',
            bio: '',
            currentPassword: '',
            newPassword: '',
            showchangesdialog: false,
            changepassworddialog: false,
            error: ''
        };
    }  
    async componentDidMount(){
        const { currentUser } = firebase.auth();
        
        firebase.database().ref(`/users/${currentUser.uid}/`).on('value', snapshot => {
            this.email = snapshot.val().email
            this.firstname = snapshot.val().firstname
            this.lastname = snapshot.val().lastname
            this.role = snapshot.val().role
            this.bio = snapshot.val().bio
            this.setState({
                email: this.email,
                firstname: this.firstname,
                lastname: this.lastname,
                role: this.role,
                bio: this.bio
            })
        })
    }

    submitChanges(){
        const { currentUser } = firebase.auth();
        const {
            firstname,
            lastname,
            role,
            currentPassword,
            bio
        } = this.state

        var Data = {
            firstname: firstname,
            lastname: lastname,
            role: role,
            bio: bio
        }
        
          return firebase.database().ref(`/users/${currentUser.uid}/`).update(Data)
            .then(result => {
                alert('Changes submitted succesfully...')
            })
            .catch(error => { this.setState({error}) })
    }

    changePassword = (currentPassword, newPassword) => {
        this.reauthenticate(currentPassword).then(() => {
          var user = firebase.auth().currentUser;
          user.updatePassword(newPassword).then(() => {
            alert("Password changed succesfully")
          }).catch((error) => { this.setState({error}) });
        }).catch((error) => { this.setState({error}) });
      }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
      }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.logo}>Edit Profile</Text>
                <Text style={styles.headingtext}>{this.state.email}</Text>
        
                <View style={styles.inputView}>
                    <TextInput  
                        style={styles.inputText}
                        placeholder={this.firstname}
                        placeholderTextColor='white'
                        onChangeText={firstname => this.setState({firstname})}/>
                </View>

                <View style={styles.inputView}>
                    <TextInput  
                        style={styles.inputText}
                        placeholder={this.lastname}
                        placeholderTextColor='white'
                        onChangeText={lastname => this.setState({lastname})}/>
                </View>

                <View style={styles.inputBioView}>
                    <TextInput  
                        style={styles.inputBio}
                        placeholder={this.lastname}
                        placeholderTextColor='white'
                        onChangeText={bio => this.setState({bio})}
                        value={this.state.bio}
                        multiline={true}
                        />
                </View>

                <View style={{width: 250, alignSelf: 'center'}}>
                    <Text style={{textAlign: 'center', color: 'red'}}>{this.state.error}</Text>
                </View>
                <View>
                    <Dialog.Container visible={this.state.showchangesdialog}>
                        <Dialog.Title>Enter password</Dialog.Title>
                        <Dialog.Description>
                            Enter password to make changes
                        </Dialog.Description>
                        <Dialog.Input 
                            onChangeText={(currentPassword) => this.setState({currentPassword})} 
                            secureTextEntry={true}
                            label="Password"
                            />
                        <Dialog.Button label="Cancel" onPress={() => this.setState({ showchangesdialog: false})}/>
                        <Dialog.Button label="Confirm" onPress={() => {
                            this.setState({showchangesdialog: false})
                            this.submitChanges()
                            }}/>
                    </Dialog.Container>
                </View>

                <View>
                    <Dialog.Container visible={this.state.changepassworddialog}>
                        <Dialog.Title>Change Password</Dialog.Title>
                        <Dialog.Description>
                            Confirm current password & enter new password
                        </Dialog.Description>
                        <Dialog.Input 
                            onChangeText={(currentPassword) => this.setState({currentPassword})} 
                            secureTextEntry={true}
                            label="Enter Current Password"
                            placeholder="Current Password"
                            />
                        <Dialog.Input 
                            onChangeText={(newPassword) => this.setState({newPassword})} 
                            secureTextEntry={true}
                            label="Enter New Password"
                            placeholder="New Password"
                            />
                        <Dialog.Button label="Cancel" onPress={() => this.setState({ changepassworddialog: false})}/>
                        <Dialog.Button label="Confirm" onPress={() => {
                            if(this.state.currentPassword != '' && this.state.newPassword != ''){
                                this.setState({changepassworddialog: false})
                                this.changePassword(this.state.currentPassword, this.state.newPassword)
                            } else {
                                Toast.show("All fields are required")
                            }
                            }}/>
                    </Dialog.Container>
                </View>

                <TouchableOpacity style={styles.loginBtn} onPress={() => this.setState({ showchangesdialog: true})}>
                    <Text style={styles.loginText}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn} onPress={() => this.setState({changepassworddialog: true})}>
                    <Text style={styles.loginText}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.loginText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
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
      inputBioView:{
        width:"80%",
        height: '30%',
        backgroundColor:"#465881",
        borderRadius:25,
        marginBottom:20,
        justifyContent: 'flex-start',
        padding:20,
      },
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:10
      },
      inputText:{
        height:50,
        color:"white"
      },
      inputBio:{
        color:"white"
      },
      headingtext:{
        color:"white",
        fontSize:20,
        marginBottom: 30
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginBottom:10
      },
      loginText: {
        color: 'white',
        fontSize: 20
      },
      dropdown:{
        height: 25,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 15,
      },
})

export default EditUserDetails;