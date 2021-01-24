import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

const Input = (props) => {
    return (
        <TextInput
            style={[styles.input, {textAlign: props.textAlign}]}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType || "default"}
            placeholderTextColor="#ABABAB"
            onChangeText={(text) => props.onChangeText(text)}
            value={props.value}
            secureTextEntry={props.secureTextEntry}
        />
    )
}

export default Input;