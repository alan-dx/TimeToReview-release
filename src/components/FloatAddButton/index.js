import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const FloatAddButton = (props) => {
    return (
        <RectButton style={styles.container} onPress={props.onPress}>
            <Icon name="plus" size={20} color="#FCFCFC" />
        </RectButton>
    )
}

export default FloatAddButton;