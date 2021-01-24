import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import styles from './styles';

function CustomButton(props) {
    return (
        <RectButton onPress={props.onPress} style={[styles.container, {backgroundColor: props.color}]}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </RectButton>
    )
}

export default CustomButton;