import React from 'react'
import { View, Text } from 'react-native'
import CustomButton from '../../components/CustomButton';
import styles from './styles';

const BePremiumScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>BePremiumScreen</Text>
            <View style={{marginTop: 25, width: '100%', alignSelf: 'center', alignItems: 'center'}}>
                <CustomButton text="COMPRAR" color='#e74e36' onPress={() => {}}/>
            </View>
        </View>
    )
}

export default BePremiumScreen