import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const BePremiumScreen = () => {

    const navigation = useNavigation()

    function handleClickGoBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Text>Tela de Premium</Text>
        </View>
    )
    
}

export default BePremiumScreen;