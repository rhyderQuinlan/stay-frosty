import React, { Component } from 'react';
import { 
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';

const FormInput = (props) => {
    const {icon, placeholder, onChangeText, type, ref, keyboardType, secureTextEntry} = props;
    return(
        <View style={styles.inputContainer}>
            <View style={styles.iconTextContainer}>
                    <Icon 
                        name={icon}
                        type={type}
                        style={styles.inputIcon}
                        color="#007FF3"
                    />
                    <TextInput 
                        ref={ref}
                        style={styles.inputs}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        underlineColorAndroid='transparent'
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry}
                        />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: '#FFD559',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 2,
        height:55,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center',
        width: '80%'
    },
    iconTextContainer:{
        marginLeft: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    inputIcon:{
        width:100,
        height:100,
    },
    inputs:{
        height:25,
        marginLeft: 10,
        width: '80%'
      },
}
)


export default FormInput;