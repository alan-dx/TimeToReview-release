import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

const BenefitsCard = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

export default BenefitsCard