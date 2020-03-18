import React, { Component } from 'react';
import { 
    View,
    StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

const DropdownInput = (props) => {
    const {icon, label, data, type, onChangeText} = props;
    return(
        <View style={styles.container}>
            <Dropdown 
                label={label}
                data={data}
                containerStyle={styles.dropdown}
                onChangeText={onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
    dropdown:{
        height: 25,
        marginLeft: 10,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 10,
      },
}
)


export default DropdownInput;