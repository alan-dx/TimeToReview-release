import React from 'react'
import {View, Text} from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles'

const DoubtContainer = (props) => {
    return (
        <RectButton style={styles.doubtItemBox} onPress={() => { props.handleOpenDoubt(props.data.key) }}>
            <Text style={styles.doubtItemText}>{props.data.title}</Text>
            <View style={styles.doubtItemButtonBox}>
                <Icon name="infocirlceo" size={20} color="#60c3eb" />
            </View>
        </RectButton>
    )
}

export default DoubtContainer