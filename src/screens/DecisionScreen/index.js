import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import styles from './styles';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/images/icons/logo.png';

const DecisionLogin = () => {
    
    const navigation = useNavigation()

    function handleClickNavigateToSignIn() {
        navigation.navigate('SignIn')
    }

    function handleClickNavigateToSignUp() {
        navigation.navigate('SignUp')
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Text style={styles.titleTop}>SEJA BEM VINDO!</Text>
                <View style={styles.logoBox}>
                    <Image source={logo} style={{width: 250, height: 250}} />
                </View>
            </View>
            <View style={styles.selectBox}>
                <View style={styles.selectContainer}>
                    <CustomButton text="LOGIN" color='#e74e36' onPress={handleClickNavigateToSignIn} />
                    <CustomButton text="CADASTRO" color='#60c3eb' onPress={handleClickNavigateToSignUp}/>
                </View>
                <Text style={styles.devText}>Por: AlmeidaDev</Text>
            </View>
        </View>
    )
}

export default DecisionLogin;