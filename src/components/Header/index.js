import React, { useCallback, useContext, useEffect } from 'react';
import {View, Text } from 'react-native';
import styles from './styles';
import { BorderlessButton } from  'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';

const Header = (props) => {

    const navigation = useNavigation()
    const { logoutContext } = useContext(AuthContext);

    async function handleGoBack() {
        if (props.title == "REVISÕES") {
            //logic to end cycle review when goBack to HomeScreen
            props.route?.params.onGoBack()
    
            if (props.route?.params.finishCycleActive) {
                navigation.goBack()
            } else {
                // alert("Há um ciclo em execução, finalize-o primeiro!")
                await props.route?.params.handleStopCycle()
                navigation.goBack()
            }
        } else {
            //route and navigation passed in AppRoutes Screen component
            console.log('não é a tela de revisões')
            navigation.goBack()
            props.route?.params.onGoBack(props.route?.params.passData)
        }
    }

    function handleLogout() {
        logoutContext();
    }

    return (
        <View style={[styles.container, {backgroundColor: props.color}]}>
            <Text style={styles.title}>{props.title}</Text>
            {
              props.showLogout ? (
                <View style={styles.buttonBox}> 
                    <BorderlessButton onPress={handleLogout} style={styles.buttonContainer}>
                        <Icon name="logout" size={20} color="#FFF" />
                    </BorderlessButton>
                </View>
            ) : (
                <View style={styles.buttonBox}> 
                    <BorderlessButton onPress={handleGoBack} style={styles.buttonContainer}>
                        <Icon name="left" size={20} color="#FFF" />
                    </BorderlessButton>
                </View>
                )

            }
        </View>
    );
}

export default Header;