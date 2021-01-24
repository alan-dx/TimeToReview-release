import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import timeFormat from '../../utils/formatDateTime';

const CicleContainer = (props) => {

    // useEffect(() => {
    //     console.log(props.data.item)
    // }, [])

    //PASSAR A TIMEFORMAT PARA AQ

    return (
        <View style={styles.timerBox}>
            <View style={styles.timerController}>
                {props.data.item.do == false ?
                    <RectButton onPress={props.data.item.do == false ? props.handleStartPauseController : () => console.log('no')}>
                        {props.startController && props.data.item.do == false?
                            <Icon2  name="controller-play" size={25} color="#303030" />:
                            <Icon2  name="controller-stop" size={25} color="#303030" />}
                    </RectButton>
                    :
                    <RectButton onPress={() => {}}>
                        <Icon  name="check" size={25} color="#303030" />
                    </RectButton>
                }
            </View>
            <Text style={styles.timerText2}>Início: {props.data.item.init}</Text>
            <Text style={styles.timerText2}> Término: {props.data.item.finish}</Text>
            <View>
                <Text style={styles.timerText2}>Cont.</Text>
                <View style={styles.timerCountReviews}>
                        <Text style={styles.timerText}>{props.data.item.reviews}</Text>
                </View>
            </View>
            <View style={styles.timerChronometerBox}>
                <Text style={styles.timerText2}>Período</Text>
                <View style={styles.timerChronometer}>
                    <Text style={styles.timerText}>{timeFormat(props.data.item.chronometer.getUTCHours(),props.data.item.chronometer.getUTCMinutes(),props.data.item.chronometer.getUTCSeconds())}</Text>
                </View>
            </View>
        </View>
    )
}

export default CicleContainer;